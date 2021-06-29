export class mayClass {
  private _x;
  private y;
  constructor(x, y) {
    this._x = x;
    this.y = y;
  }
  @decorator()
  set x(newX) {
    console.log("man am heer");
    this._x = newX;
  }
  get x() {
    return this._x;
  }
}
function decorator() {
  console.log("here");
  return function (...args) {
    console.log(args);
  };
}
// Symbol
const app = new mayClass("what", "man");
app.x = 4;
// console.log(app.x);
