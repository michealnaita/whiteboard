import { classicNameResolver } from "typescript";
import * as Shapes from "./classes";
interface mouseInterface {
  x: number;
  y: number;
  isMouseDown: boolean;
}
interface stateInterface {
  activeTool: string;
  strokeColor: string;
  strokeSize: number;
}
export default function canvasObject({
  canvasRef,
  previewCanvasRef,
  canvasConfig,
}) {
  return new Canvas({
    canvas_ref: canvasRef,
    preview_canvas_ref: previewCanvasRef,
    shapes: Shapes,
    canvasConfig,
  });
}
class Canvas {
  private Context;
  private PreviewContext;
  private shapes;
  private canvas;
  private history: string[] = [];
  private MOUSE: mouseInterface = {
    x: 0,
    y: 0,
    isMouseDown: true,
  };
  private _canvasConfig: stateInterface = {
    activeTool: "",
    strokeColor: "",
    strokeSize: 1,
  };

  constructor({ canvas_ref, preview_canvas_ref, shapes, canvasConfig }) {
    this.Context = canvas_ref.getContext("2d");
    this.PreviewContext = preview_canvas_ref.getContext("2d");
    this.shapes = shapes;
    this.canvas = canvas_ref;
    this._canvasConfig = canvasConfig;
    this.init(canvas_ref, preview_canvas_ref);
  }
  private configureCanvas() {
    const { strokeSize, strokeColor } = this._canvasConfig;
    this.Context.strokeStyle = strokeColor;
    this.Context.fillStyle = strokeColor;
    this.Context.lineWidth = strokeSize;
    this.PreviewContext.strokeStyle = strokeColor;
    this.PreviewContext.lineWidth = strokeSize;
  }
  private init(canvas_ref, preview_canvas_ref) {
    canvas_ref.width = window.innerWidth;
    canvas_ref.height = window.innerHeight;
    preview_canvas_ref.width = window.innerWidth;
    preview_canvas_ref.height = window.innerHeight;
    this.configureCanvas();
    //  EVENT LISTENERS
    this.canvas.addEventListener("mousemove", (e) => {
      this.MOUSE.x = e.clientX;
      this.MOUSE.y = e.clientY;
    });
    this.canvas.addEventListener("mouseup", () => {
      this.MOUSE.isMouseDown = false;
    });
    this.canvas.addEventListener("touchend", () => {
      this.MOUSE.isMouseDown = false;
    });
    this.canvas.addEventListener("mousedown", (event) => {
      event.button === 0 && this.globalDraw(event);
    });
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const { clientX, clientY } = e.changedTouches[0];
      this.MOUSE.x = clientX;
      this.MOUSE.y = clientY;
    });
    this.canvas.addEventListener("touchstart", (event) => {
      event.preventDefault();
      const { clientX, clientY } = event.changedTouches[0];
      this.globalDraw({ clientX, clientY });
    });
  }
  set canvasConfig({ activeTool, strokeColor, strokeSize }) {
    this._canvasConfig = {
      activeTool: activeTool || this._canvasConfig.activeTool,
      strokeColor: strokeColor || this._canvasConfig.strokeColor,
      strokeSize: strokeSize || this._canvasConfig.strokeSize,
    };
    this.configureCanvas();
  }
  get canvasConfig() {
    return this._canvasConfig;
  }
  public drawImage(imageData) {
    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      this.Context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.Context.drawImage(
        image,
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );
    };
  }
  public undo = () => {
    const count = this.history.length;
    if (count === 1) return this.clearCanvas();
    const previous_frame = this.history[count - 2];
    this.drawImage(previous_frame);
    // remove the current image drawing
    this.history.splice(count - 1, 1);
    // console.log(previous_frame);
  };
  private addToHistory() {
    const current_frame = this.canvas.toDataURL("image/svg");
    if (this.history.length === 30) {
      this.history.splice(0, 1);
    }
    this.history.push(current_frame);
    return current_frame;
  }
  private interationEvent() {
    const current_frame = this.addToHistory();
    this.drawImage(current_frame);
    const event = new CustomEvent("interaction", {
      detail: {
        current_frame,
      },
    });
    this.canvas.dispatchEvent(event);
  }
  public clearCanvas = () => {
    this.addToHistory();
    this.Context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };
  private erase(startX: number, startY: number) {
    // logic
  }
  private eraseSelection(startX: number, startY: number) {
    const selection = new this.shapes.SelectionEraser({
      x: startX,
      y: startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(() => initDrawing(this));
    function initDrawing(canvasObject) {
      if (!canvasObject.MOUSE.isMouseDown) {
        selection.clearPreview();
        selection.draw();
        canvasObject.interationEvent();
        return;
      }
      const width = canvasObject.MOUSE.x - startX;
      const height = canvasObject.MOUSE.y - startY;
      selection.width = width;
      selection.height = height;
      selection.preview();
      requestAnimationFrame(() => initDrawing(canvasObject));
    }
  }
  private globalDraw(event) {
    this.MOUSE.isMouseDown = true;
    const startX = event.clientX;
    const startY = event.clientY;
    switch (this.canvasConfig.activeTool.toLowerCase()) {
      case "pencil":
        this.drawStroke(startX, startY);
        break;
      case "circle":
        this.drawCircle(startX, startY);
        break;
      case "rectangle":
        this.drawRectangle(startX, startY);
        break;
      case "triangle":
        this.drawTriangle(startX, startY);
        break;
      case "line":
        this.drawLine(startX, startY);
        break;
      case "erase-selection":
        this.eraseSelection(startX, startY);
        break;
      default:
        break;
    }
    return;
  }
  private drawCircle(startX: number, startY: number) {
    const circle = new this.shapes.Circle({
      x: startX,
      y: startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(() => initDrawing(this));
    function initDrawing(canvasObject) {
      if (!canvasObject.MOUSE.isMouseDown) {
        circle.clearPreview();
        circle.draw();
        canvasObject.interationEvent();
        return;
      }
      const deltaX = canvasObject.MOUSE.x - startX;
      const deltaY = canvasObject.MOUSE.y - startY;
      circle.radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      circle.preview();
      requestAnimationFrame(() => initDrawing(canvasObject));
    }
  }
  private drawTriangle(startX: number, startY: number) {
    const triangle = new this.shapes.Triangle({
      x: startX,
      y: startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(() => initDrawing(this));
    function initDrawing(canvasObject) {
      if (!canvasObject.MOUSE.isMouseDown) {
        triangle.clearPreview();
        triangle.draw();
        canvasObject.interationEvent();
        return;
      }
      const deltaX = canvasObject.MOUSE.x - startX;
      const deltaY = canvasObject.MOUSE.y - startY;
      triangle.radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      triangle.preview();
      requestAnimationFrame(() => initDrawing(canvasObject));
    }
  }
  private drawRectangle(startX: number, startY: number) {
    const rect = new this.shapes.Rectangle({
      x: startX,
      y: startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(() => initDrawing(this));
    function initDrawing(canvasObject) {
      if (!canvasObject.MOUSE.isMouseDown) {
        rect.clearPreview();
        rect.draw();
        canvasObject.interationEvent();
        return;
      }
      const width = canvasObject.MOUSE.x - startX;
      const height = canvasObject.MOUSE.y - startY;
      rect.width = width;
      rect.height = height;
      rect.preview();
      requestAnimationFrame(() => initDrawing(canvasObject));
    }
  }
  private drawLine(startX: number, startY: number) {
    const line = new this.shapes.Line({
      startX,
      startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(() => initDrawing(this));
    function initDrawing(canvasObject) {
      if (!canvasObject.MOUSE.isMouseDown) {
        line.clearPreview();
        line.draw();
        canvasObject.interationEvent();
        return;
      }
      line.endX = canvasObject.MOUSE.x;
      line.endY = canvasObject.MOUSE.y;
      line.preview();
      requestAnimationFrame(() => initDrawing(canvasObject));
    }
  }
  private drawStroke(startX: number, startY: number) {
    this.Context.beginPath();
    this.Context.lineCap = "round";
    this.Context.lineJoin = "round";
    this.Context.moveTo(startX, startY);
    this.Context.lineTo(startX, startY);
    requestAnimationFrame(() => initDrawing(this));
    function initDrawing(canvasObject) {
      if (!canvasObject.MOUSE.isMouseDown) {
        canvasObject.interationEvent();
        return;
      }
      canvasObject.Context.lineTo(canvasObject.MOUSE.x, canvasObject.MOUSE.y);
      canvasObject.Context.stroke();
      requestAnimationFrame(() => initDrawing(canvasObject));
    }
  }
  private insertImage = (startX: number, startY: number) => {
    // logic
  };
  public insertText = ({
    startX,
    startY,
    width,
    text,
    fontSize,
    lineHeight,
  }: {
    startX: number;
    startY: number;
    width: number;
    text: string;
    fontSize: number;
    lineHeight: number;
  }) => {
    this.Context.textBaseline = "bottom";
    this.Context.font = `${fontSize}px monospace`;
    const printAtWordWrap = (text) => {
      const stringArray = [];
      const words = text.split(" ");
      const groupWords = (someWords) => {
        const [prev_string, string] = someWords;
        // console.log(prev_string, "+", string);
        if (!string) {
          stringArray.push(prev_string);
          return;
        }
        const total_string = [prev_string, string].join(" ");
        const string_width = this.Context.measureText(total_string).width;
        // console.log(string_width);
        if (string_width > width) {
          stringArray.push(prev_string);
          const newSomeWords = [...someWords.slice(1)];
          groupWords(newSomeWords);
        } else {
          const newSomeWords = [total_string, ...someWords.slice(2)];
          groupWords(newSomeWords);
        }
      };
      groupWords(words);
      stringArray.map((word, i) => {
        const x = startX;
        const y = startY + i * lineHeight;
        this.Context.fillText(word, x, y);
      });
    };
    printAtWordWrap(text);
  };
}
