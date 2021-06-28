import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CanvasApi from "./canvas_api";
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
  let canvasRef: any = useRef();
  let previewCanvasRef: any = useRef();
  const [canvasObject, setCanvasObject] = useState(null);
  useEffect(() => {
    canvasRef &&
      previewCanvasRef &&
      setCanvasObject(
        CanvasApi({
          canvasRef,
          previewCanvasRef,
          canvasConfig,
        })
      );
  }, []);
  useEffect(() => {
    // canvasObject && canvasObject.setCanvasSettings(canvasConfig);
    console.log(canvasObject);
  }, [canvasConfig]);
  return (
    <div>
      <canvas
        ref={(el) => (previewCanvasRef = el)}
        className="preview-canvas"
      ></canvas>
      <canvas ref={(el) => (canvasRef = el)} className="canvas"></canvas>
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
