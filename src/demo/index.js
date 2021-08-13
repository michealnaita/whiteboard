import React, { useRef, useEffect, useState } from "react";
import CanvasApi from "./canvas_API";
import "./styles.scss";
import Selector, { Option } from "./selector";
import Sockets from "./sockets";
export default function Demo() {
  const [CanvasObject, setCanvasObject] = useState(null);
  const [socket, setSocket] = useState(null);
  let canvas = useRef(null);
  let preview_canvas = useRef(null);
  const [Options, setOptions] = useState({
    strokeColor: "#000000",
    shape: "stroke",
  });
  // #D56868

  // setup the Canvas Objcet when the canas element has loaded in dom
  useEffect(() => {
    canvas &&
      preview_canvas &&
      setCanvasObject(CanvasApi(canvas, preview_canvas));
  }, []);

  // liseten for change in the drawing optinons
  useEffect(() => {
    if (!CanvasObject) return;
    CanvasObject.setStrokeColor(Options.strokeColor);
    CanvasObject.setShape(Options.shape);
  }, [Options]);

  // listen for the active CanvasObject
  useEffect(() => {
    CanvasObject && setSocket(Sockets(CanvasObject.printImage));
  }, [CanvasObject]);

  // listen for when the socket has been defined
  useEffect(() => {
    socket &&
      canvas.addEventListener("interaction", (e) => {
        socket && socket.draw(e.detail.current_frame);
      });
  }, [socket]);

  const shapes = ["Triangle", "Stroke", "Circle", "Rectangle", "Line", "Erase"];
  return (
    <div className="app">
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
        here
        <canvas className="canvas" ref={(el) => (canvas = el)}></canvas>
        <canvas
          className="preview-canvas"
          ref={(el) => (preview_canvas = el)}
        ></canvas>
      </div>
    </div>
  );
}
