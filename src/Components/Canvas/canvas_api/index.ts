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
  private history: [string];
  private MOUSE: mouseInterface = {
    x: 0,
    y: 0,
    isMouseDown: true,
  };
  private _canvasConfig: stateInterface = {
    activeTool: "stroke",
    strokeColor: "#000000",
    strokeSize: 4,
  };

  constructor({ canvas_ref, preview_canvas_ref, shapes, canvasConfig }) {
    this.Context = canvas_ref.getContext("2d");
    this.PreviewContext = preview_canvas_ref.getContext("2d");
    this.init(canvas_ref, preview_canvas_ref);
    this.shapes = shapes;
    this.canvas = canvas_ref;
    this._canvasConfig = canvasConfig;
  }
  private configureCanvas() {
    const { strokeSize, strokeColor } = this._canvasConfig;
    this.Context.strokeStyle = strokeColor;
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
    canvas_ref.addEventListener("mousemove", (e) => {
      this.MOUSE.x = e.clientX;
      this.MOUSE.y = e.clientY;
    });
    canvas_ref.addEventListener("mouseup", () => {
      this.MOUSE.isMouseDown = false;
    });
    canvas_ref.addEventListener("touchend", () => {
      this.MOUSE.isMouseDown = false;
    });
    canvas_ref.addEventListener("mousedown", (event) => {
      this.globalDraw(event);
    });
    canvas_ref.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const { clientX, clientY } = e.changedTouches[0];
      this.MOUSE.x = clientX;
      this.MOUSE.y = clientY;
    });
    canvas_ref.addEventListener("touchstart", (event) => {
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
  public drawImage() {
    this.canvas.drawImage(0, 0, window.innerWidth, window.innerHeight);
  }
  public undo() {
    // logic
  }
  private interationEvent() {
    const current_frame = this.canvas.toDataURL();
    const event = new CustomEvent("interaction", {
      detail: {
        current_frame,
      },
    });
    this.canvas.dispatchEvent(event);
  }
  private clearCanvas() {
    // logic
  }
  private erase(startX: number, startY: number) {
    // logic
  }
  private globalDraw(event) {
    this.MOUSE.isMouseDown = true;
    const startX = event.clientX;
    const startY = event.clientY;
    switch (this.canvasConfig.activeTool.toLowerCase()) {
      case "stroke":
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
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!this.MOUSE.isMouseDown) {
        circle.clearPreview();
        circle.draw();
        this.interaction();
        return;
      }
      const deltaX = this.MOUSE.x - startX;
      const deltaY = this.MOUSE.y - startY;
      circle.radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      circle.preview();
      requestAnimationFrame(initDrawing);
    }
  }
  private drawTriangle(startX: number, startY: number) {
    const triangle = new this.shapes.Triangle({
      x: startX,
      y: startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!this.MOUSE.isMouseDown) {
        triangle.clearPreview();
        triangle.draw();
        this.interaction();
        return;
      }
      const deltaX = this.MOUSE.x - startX;
      const deltaY = this.MOUSE.y - startY;
      triangle.radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      triangle.preview();
      requestAnimationFrame(initDrawing);
    }
  }
  private drawRectangle(startX: number, startY: number) {
    const rect = new this.shapes.Rectangle({
      x: startX,
      y: startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!this.MOUSE.isMouseDown) {
        rect.clearPreview();
        rect.draw();
        this.interaction();
        return;
      }
      const width = this.MOUSE.x - startX;
      const height = this.MOUSE.y - startY;
      rect.width = width;
      rect.height = height;
      rect.preview();
      requestAnimationFrame(initDrawing);
    }
  }
  private drawLine(startX: number, startY: number) {
    const line = new this.shapes.Line({
      startX,
      startY,
      Context: this.Context,
      PreviewContext: this.PreviewContext,
    });
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!this.MOUSE.isMouseDown) {
        line.clearPreview();
        line.draw();
        this.interaction();
        return;
      }
      line.endX = this.MOUSE.x;
      line.endY = this.MOUSE.y;
      line.preview();
      requestAnimationFrame(initDrawing);
    }
  }
  private drawStroke(startX: number, startY: number) {
    this.Context.beginPath();
    this.Context.lineCap = "round";
    this.Context.lineJoin = "round";
    this.Context.moveTo(startX, startY);
    this.Context.lineTo(startX, startY);
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!this.MOUSE.isMouseDown) {
        this.interaction();
        return;
      }
      this.Context.lineTo(this.MOUSE.x, this.MOUSE.y);
      this.Context.stroke();
      requestAnimationFrame(initDrawing);
    }
  }
  private insertImage(startX: number, startY: number) {
    // logic
  }
  private insertText(startX: number, startY: number) {
    // logic
  }
}
