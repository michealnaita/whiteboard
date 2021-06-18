import React, { useRef, useEffect, useState } from "react";
import CanvasApi from "./canvas_API";
import "./styles.scss";
import Selector, { Option } from "./selector";
export default function Demo() {
  const [CanvasObject, setCanvasObject] = useState(null);
  let canvas = useRef(null);
  let preview_canvas = useRef(null);
  const [Options, setOptions] = useState({
    strokeColor: "#000000",
    shape: "stroke",
  });
  // #D56868
  useEffect(() => {
    setCanvasObject(CanvasApi(canvas, preview_canvas));
    if (canvas)
      canvas.addEventListener(
        "interaction",
        (e) => {}
        // console.log(e.detail.current_frame)
      );
    return () => {
      if (canvas) canvas.removeEventListener("interaction", () => {});
    };
  }, []);
  useEffect(() => {
    if (!CanvasObject) return;
    CanvasObject.setStrokeColor(Options.strokeColor);
    CanvasObject.setShape(Options.shape);
  }, [Options]);
  const shapes = ["Triangle", "Stroke", "Circle", "Rectangle", "Line"];
  return (
    <div>
      <div className="menu">
        <input
          type="color"
          onChange={(e) =>
            setOptions({ ...Options, strokeColor: e.target.value })
          }
        ></input>
        {shapes.length && (
          <Selector onChange={(shape) => setOptions({ ...Options, shape })}>
            {shapes.map((shape, i) => (
              <Option
                value={shape.toLowerCase()}
                selected={Options.shape === shape.toLowerCase() ? true : false}
                key={i}
              >
                {shape}
              </Option>
            ))}
          </Selector>
        )}
      </div>
      <div className="drawing-board">
        <canvas className="canvas" ref={(el) => (canvas = el)}></canvas>
        <canvas
          className="preview-canvas"
          ref={(el) => (preview_canvas = el)}
        ></canvas>
      </div>
    </div>
  );
}
/*
(
              <Option
              // value={shape.toLowerCase()}
              // selected={Options.shape === shape.toLowerCase() ? true : false}
              >
                shape
              </Option>
            )
 */
