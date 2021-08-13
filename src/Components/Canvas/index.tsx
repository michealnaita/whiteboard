import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CanvasApi from "./canvas_api";
import "../../demo/styles.scss";
import { connect } from "react-redux";
import { clearCanvas, setCanvasMethods } from "../../logic/redux/ducks/canvas";
import Menu from "./menu";

function select(state) {
  return {
    canvasConfig: { ...state.canvas },
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setCanvasMethods: (methods) => dispatch(setCanvasMethods(methods)),
  };
}
function Canvas({
  canvasConfig,
  setCanvasMethods,
}: {
  canvasConfig?: {
    strokeSize: number;
    strokeColor: string;
    activeTool: string;
  };
  setCanvasMethods?: Function;
}) {
  let canvasRef: any = useRef();
  let previewCanvasRef: any = useRef();
  const [canvasObject, setCanvasObject] = useState(null);
  useEffect(() => {
    canvasRef &&
      previewCanvasRef &&
      setCanvasObject(function () {
        const obj = CanvasApi({
          canvasRef,
          previewCanvasRef,
          canvasConfig,
        });
        setCanvasMethods({
          clearCanvasMethod: obj.clearCanvas,
          undoCanvasMethod: obj.undo,
        });
        return obj;
      });
  }, []);

  useEffect(() => {
    if (canvasObject) {
      canvasObject.canvasConfig = {
        ...canvasConfig,
      };
    }
  }, [canvasConfig]);
  return (
    <DrawingBoard>
      <canvas
        ref={(el) => (previewCanvasRef = el)}
        className="preview-canvas"
      ></canvas>
      <canvas ref={(el) => (canvasRef = el)} className="canvas"></canvas>
      {/* <Menu /> */}
    </DrawingBoard>
  );
}

export default connect(select, mapDispatchToProps)(Canvas);
const DrawingBoard = styled.div`
  width: 100%;
  height: 100%;
  /* z-index: -1; */
`;
