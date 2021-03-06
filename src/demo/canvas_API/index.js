import { Circle, Rectangle, Line, Triangle } from "./classes";
const CanvasObject = (canvas, preview_canvas) => {
  // IMPORTANT VARIABLES
  const Context = canvas.getContext("2d");
  const PreviewContext = preview_canvas.getContext("2d");
  // Context.lineWidth = 8;
  const MOUSE = {
    x: 0,
    y: 0,
    isMouseDown: false,
    points: [],
  };
  let state = {
    activeTool: "erase",
    strokeColor: "#ffb500",
    strokeSize: 1,
  };
  canvas.state = state;
  setDimentions();

  // EVENT LISTENERS
  // window.addEventListener("resize", () => setDimentions());
  canvas.addEventListener("mousemove", (e) => {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
    MOUSE.points.push([e.clientX, e.clientY]);
  });
  canvas.addEventListener("mouseup", () => {
    MOUSE.isMouseDown = false;
  });
  canvas.addEventListener("touchend", () => {
    MOUSE.isMouseDown = false;
  });
  canvas.addEventListener("mousedown", (event) => {
    draw(event);
  });
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const { clientX, clientY } = e.changedTouches[0];
    MOUSE.x = clientX;
    MOUSE.y = clientY;
  });
  canvas.addEventListener("touchstart", (event) => {
    const button = document.createElement("button");
    button.focus();
    // button.onfocus = () => {

    // };
    event.preventDefault();
    const { clientX, clientY } = event.changedTouches[0];
    draw({ clientX, clientY });
  });
  // RETURN OBJECT
  return Object.freeze({
    setCanvasSettings: function ({ strokeSize, strokeColor, activeTool }) {
      state = { strokeSize, strokeColor, activeTool };
      setEnv();
    },
    setStrokeColor: () => {},
    setShape: () => {},
    printImage: function (imageData) {
      const image = new Image();
      image.src = imageData;
      image.onload = () => {
        // Context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // Context.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
      };
    },
  });

  // ACTIONS
  function setEnv() {
    // Context.lineCap = "butt";
    // Context.strokeStyle = state.strokeColor;
    // Context.lineWidth = state.strokeSize;
    // PreviewContext.strokeStyle = state.strokeColor;
    // PreviewContext.lineWidth = state.strokeSize;
  }
  function draw(event) {
    // setEnv();
    MOUSE.isMouseDown = true;
    const startX = event.clientX;
    const startY = event.clientY;
    switch (state.activeTool) {
      case "pencil":
        createStroke(startX, startY);
        break;
      case "circle":
        createCircle(startX, startY);
        break;
      case "rectangle":
        createRectangle(startX, startY);
        break;
      case "triangle":
        createTriangle(startX, startY);
        break;
      case "line":
        createLine(startX, startY);
        break;
      case "erase":
        erase(startX, startY);
        break;
      default:
        break;
    }
    return;
  }
  function setDimentions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    preview_canvas.width = window.innerWidth;
    preview_canvas.height = window.innerHeight;
  }

  function interaction() {
    const current_frame = canvas.toDataURL();
    const event = new CustomEvent("interaction", {
      detail: {
        current_frame,
      },
    });
    canvas.dispatchEvent(event);
  }

  function createRectangle(startX, startY) {
    const rect = new Rectangle({
      x: startX,
      y: startY,
      Context,
      PreviewContext,
    });
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!MOUSE.isMouseDown) {
        rect.clearPreview();
        rect.draw();
        interaction();
        return;
      }
      const width = MOUSE.x - startX;
      const height = MOUSE.y - startY;
      rect.width = width;
      rect.height = height;
      rect.preview();
      requestAnimationFrame(initDrawing);
    }
  }

  function createCircle(startX, startY) {
    Context.lineWidth = 4;
    const circle = new Circle({
      x: startX,
      y: startY,
      Context,
      PreviewContext,
    });
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!MOUSE.isMouseDown) {
        circle.clearPreview();
        circle.draw();
        interaction();
        return;
      }
      const deltaX = MOUSE.x - startX;
      const deltaY = MOUSE.y - startY;
      circle.radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      circle.preview();
      requestAnimationFrame(initDrawing);
    }
  }

  function createTriangle(startX, startY) {
    const triangle = new Triangle({
      x: startX,
      y: startY,
      Context,
      PreviewContext,
    });
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!MOUSE.isMouseDown) {
        triangle.clearPreview();
        triangle.draw();
        interaction();
        return;
      }
      const deltaX = MOUSE.x - startX;
      const deltaY = MOUSE.y - startY;
      triangle.radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      triangle.preview();
      requestAnimationFrame(initDrawing);
    }
  }

  function createLine(startX, startY) {
    const line = new Line({
      startX,
      startY,
      Context,
      PreviewContext,
    });
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!MOUSE.isMouseDown) {
        line.clearPreview();
        line.draw();
        interaction();
        return;
      }
      line.endX = MOUSE.x;
      line.endY = MOUSE.y;
      line.preview();
      requestAnimationFrame(initDrawing);
    }
  }

  function createStroke(startX, startY) {
    setEnv();
    Context.beginPath();
    Context.lineCap = "round";
    Context.lineJoin = "round";
    Context.moveTo(startX, startY);
    Context.lineTo(startX, startY);
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!MOUSE.isMouseDown) {
        interaction();
        return;
      }
      Context.lineTo(MOUSE.x, MOUSE.y);
      Context.stroke();
      requestAnimationFrame(initDrawing);
    }
  }

  function erase(startX, startY) {
    Context.beginPath();
    Context.moveTo(startX, startY);
    Context.fillRect(startX, startY, 10, 10);
    requestAnimationFrame(initDrawing);
    function initDrawing() {
      if (!MOUSE.isMouseDown) {
        // interaction();
        return;
      }
      Context.fillRect(MOUSE.x, MOUSE.y, 10, 10);
      Context.fill();
      requestAnimationFrame(initDrawing);
    }
  }
};
export default CanvasObject;
