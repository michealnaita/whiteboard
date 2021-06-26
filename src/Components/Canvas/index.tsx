import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CanvasApi from "../../demo/canvas_API";
import "../../demo/styles.scss";
import { connect } from "react-redux";
import Menu from "./menu";

function select(state) {
  return {
    canvasConfig: { ...state.canvas },
  };
}
function Canvas({
  canvasConfig,
}: {
  canvasConfig?: {
    strokeSize: number;
    strokeColor: string;
    activeTool: string;
  };
}) {
  let canvas_ref: any = useRef();
  let preview_canvas_ref: any = useRef();
  const [canvasObject, setCanvasObject] = useState(null);
  useEffect(() => {
    canvas_ref &&
      preview_canvas_ref &&
      setCanvasObject(CanvasApi(canvas_ref, preview_canvas_ref));
  }, []);
  useEffect(() => {
    canvasObject && canvasObject.setCanvasSettings(canvasConfig);
  }, [canvasConfig]);
  console.log(canvasConfig);
  return (
    <div>
      <canvas
        ref={(el) => (preview_canvas_ref = el)}
        className="preview-canvas"
      ></canvas>
      <canvas ref={(el) => (canvas_ref = el)} className="canvas"></canvas>
      {/* <Menu /> */}
    </div>
  );
}

export default connect(select)(Canvas);
const DrawingBoard = styled.div`
  width: 100%;
  height: 100%;
  /* z-index: -1; */
`;
