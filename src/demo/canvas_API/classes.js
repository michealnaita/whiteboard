class Shape {
  x;
  y;
  Context;
  PreviewContext;
  constructor(x, y, Context, PreviewContext) {
    this.x = x;
    this.y = y;
    this.PreviewContext = PreviewContext;
    this.Context = Context;
  }
  draw(context = null) {
    return;
  }
  clearPreview() {
    this.PreviewContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  preview() {
    this.clearPreview();
    this.draw(this.PreviewContext);
  }
}

export class Circle extends Shape {
  radius;
  constructor(config) {
    super(config.x, config.y, config.Context, config.PreviewContext);
    this.radius = config.radius;
  }
  draw(context = null) {
    const CURRENT_CONTEXT = context || this.Context;
    CURRENT_CONTEXT.setTransform(1, 0, 0, 1, 0, 0);
    CURRENT_CONTEXT.beginPath();
    CURRENT_CONTEXT.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    CURRENT_CONTEXT.stroke();
  }
}

export class Rectangle extends Shape {
  height;
  width;
  constructor(config) {
    super(config.x, config.y, config.Context, config.PreviewContext);
    this.height = config.height || 0;
    this.width = config.width || 0;
  }
  draw(context = null) {
    const CURRENT_CONTEXT = context || this.Context;
    CURRENT_CONTEXT.setTransform(1, 0, 0, 1, 0, 0);
    CURRENT_CONTEXT.beginPath();
    CURRENT_CONTEXT.rect(this.x, this.y, this.width, this.height);
    CURRENT_CONTEXT.stroke();
  }
}

export class Triangle extends Shape {
  radius;
  constructor(config) {
    super(config.x, config.y, config.Context, config.PreviewContext);
    this.radius = config.radius;
  }
  draw(context = null) {
    const CURRENT_CONTEXT = context || this.Context;
    const [a, b, c] = this.calcVertices(this.radius, this.x, this.y);
    CURRENT_CONTEXT.setTransform(1, 0, 0, 1, 0, 0);
    CURRENT_CONTEXT.beginPath();
    CURRENT_CONTEXT.moveTo(a.x, a.y); //start at vertice a
    CURRENT_CONTEXT.lineTo(b.x, b.y); // line to vertice b
    CURRENT_CONTEXT.lineTo(c.x, c.y); // line to vertice c
    CURRENT_CONTEXT.closePath(); // close it up at a
    CURRENT_CONTEXT.stroke();
  }
  calcVertices(r, x, y) {
    const deltaY = r * Math.sin((30 * Math.PI) / 180);
    const deltaX = r * Math.cos((30 * Math.PI) / 180);

    const a = { x: x - deltaX, y: y + deltaY }; // determine the vertice a
    const b = { x: x + deltaX, y: y + deltaY }; // determine vertice b
    const c = { x: x, y: y - r }; // determine vertice c
    return [a, b, c];
  }
}

export class Line extends Shape {
  endX;
  endY;
  constructor(config) {
    super(config.startX, config.startY, config.Context, config.PreviewContext);
    this.endX = config.endX;
    this.endY = config.endY;
  }
  draw(context = null) {
    const CURRENT_CONTEXT = context || this.Context;
    CURRENT_CONTEXT.beginPath();
    CURRENT_CONTEXT.moveTo(this.x, this.y);
    CURRENT_CONTEXT.lineTo(this.endX, this.endY);
    CURRENT_CONTEXT.stroke();
  }
}
