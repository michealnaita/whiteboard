import { expect } from "chai";
import positionModel from "../helpers/positionModel";
describe("Positioning the Canvas settings menu model not to overflow the page", () => {
  const model = {
    height: 350,
    width: 300,
  };
  const window = {
    innerHeight: 700,
    innerWidth: 1500,
  };
  it("should the same coords at init if there is more space on the bottom and right.", () => {
    expect(positionModel([0, 0], window)).to.deep.equal([0, 0]);
  });
  it("should adjust the Y coords if there is less  space on the bottom of the page.", () => {
    const y = window.innerHeight;
    expect(positionModel([0, y], window)).to.deep.equal([0, y - model.height]);
  });
  it("should adjust the X coords if there is less  space on the right of the page.", () => {
    const x = window.innerWidth;
    expect(positionModel([x, 0], window)).to.deep.equal([x - model.width, 0]);
  });
  it("should adjust the X and Y coords if there is less  space on the right and bottom of the page.", () => {
    const y = window.innerHeight;
    const x = window.innerWidth;
    expect(positionModel([x, y], window)).to.deep.equal([
      x - model.width,
      y - model.height,
    ]);
  });
});
