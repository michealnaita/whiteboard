import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CanvasApi from "./canvas_api";
import { connect } from "react-redux";
import { clearCanvas, setCanvasMethods } from "../../logic/redux/ducks/canvas";
import Menu from "./menu";
import {
  getAutomaticTypeDirectiveNames,
  isConstructorDeclaration,
} from "typescript";
import positionModel from "../../helpers/positionModel";
import useLocalStoraage from "../../helpers/useLocalStorage";
import TextInput from "./textInput";
import ImageInput from "./imageInput";

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
    canvasColor: string;
  };
  setCanvasMethods?: Function;
}) {
  let canvasRef: any = useRef();
  let previewCanvasRef: any = useRef();
  const [showTextInput, setShowTextInput] = useState({
    status: false,
    position: [],
  });
  const [showImageInput, setShowImageInput] = useState({
    status: false,
    position: [],
  });
  const [canvasObject, setCanvasObject] = useState(null);
  const [displayMenu, setDisplayMenu] = useState({
    status: false,
    position: [150, 50],
  });
  const [canvasColor, setCanvasColor] = useState(
    canvasConfig.canvasColor || "#eeee"
  );
  // local variables
  const [canvasColorLocal, setCanvasColorLocal] =
    useLocalStoraage("canvas_color");

  function handleDisplayMenu(event) {
    event.preventDefault();
    const { clientX, clientY } = event;
    const [x, y] = positionModel([clientX, clientY], window);
    setDisplayMenu({
      status: true,
      position: [x, y],
    });
  }
  function insertText() {
    if (canvasObject) return canvasObject.insertText;
  }
  function insertImage() {}
  function handleClick(e) {
    const { clientX, clientY } = e;
    if (canvasConfig.activeTool === "text")
      setShowTextInput({ status: true, position: [clientX, clientY] });
    if (canvasConfig.activeTool === "image")
      setShowImageInput({ status: true, position: [clientX, clientY] });
  }
  useEffect(() => {
    setCanvasColorLocal("canvas_color", canvasColor);
  }, [canvasColor]);

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
    <DrawingBoard canvasColor={canvasColor}>
      <canvas
        ref={(el) => (previewCanvasRef = el)}
        className="preview-canvas"
      ></canvas>
      <canvas
        ref={(el) => (canvasRef = el)}
        className="canvas"
        onContextMenu={(e) => handleDisplayMenu(e)}
        onClick={(e) => handleClick(e)}
      ></canvas>
      <Menu
        displayMenu={displayMenu}
        setCanvasColor={setCanvasColor}
        setDisplayMenu={setDisplayMenu}
      />
      <TextInput
        insertText={canvasObject && canvasObject.insertText}
        activeTool={canvasConfig.activeTool}
        fontColor={canvasConfig.strokeColor}
        show={showTextInput}
        setShowTextInput={setShowTextInput}
      />
      <ImageInput
        insertText={canvasObject && canvasObject.insertText}
        activeTool={canvasConfig.activeTool}
        fontColor={canvasConfig.strokeColor}
        show={showImageInput}
        setShowTextInput={setShowImageInput}
      />
    </DrawingBoard>
  );
}

export default connect(select, mapDispatchToProps)(Canvas);
const DrawingBoard = styled.div`
  width: 100%;
  height: 100%;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${({ canvasColor }) => canvasColor || ""};
  .preview-canvas,
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
  }
  .preview-canvas {
    pointer-events: none;
  }
`;
