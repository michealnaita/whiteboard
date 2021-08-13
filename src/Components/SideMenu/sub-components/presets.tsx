import React from "react";
import styled, { css } from "styled-components";
import * as action from "../../../logic/redux/ducks/canvas";
import { connect } from "react-redux";

const some_grey = "#292929";
interface presetInterface {
  iconUrl: string;
  value: string;
  size: number[];
  isActive: Boolean;
  extensions: presetInterface[];
}
function select(state) {
  return {
    activeTool: state.canvas.activeTool,
  };
}
function mapToDispatchProps(dispatch) {
  return {
    setActiveTool: (tool) => dispatch(action.changeTool(tool)),
    clearCanvas: () => dispatch(action.clearCanvas()),
    undoCanvasAction: () => dispatch(action.undoCanvasAction()),
  };
}

function Presets({
  preset,
  activateTool,
  activeTool,
  setActiveTool,
  clearCanvas,
  undoCanvasAction,
}: {
  preset: presetInterface;
  activateTool: Function;
  activeTool?: String;
  setActiveTool?: Function;
  clearCanvas?: Function;
  undoCanvasAction?: Function;
}) {
  const [minHeight, maxHeight] = preset.size;
  function selectTool(event, preset) {
    event.stopPropagation();
    const { value } = preset;
    if (value === "clear") {
      return clearCanvas();
    }
    if (value === "undo") {
      return undoCanvasAction();
    }
    if (!preset.isActive) {
      activateTool(preset);
    }
    setActiveTool(value);
  }
  return (
    <Preset
      minHeight={preset.isActive}
      onClick={(e) => selectTool(e, preset)}
      activeTool={preset.isActive && preset.value == activeTool}
    >
      <img
        src={preset.iconUrl}
        alt=""
        height={preset.isActive ? maxHeight : minHeight}
      />
      {preset.extensions ? (
        <button
          className="extension-button"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={"/assets/icons/extension.svg"} height="10px" alt="" />
          {preset.extensions ? (
            <ul className="extension">
              {preset.extensions.map((preset, i) => (
                <li key={i}>
                  <Presets
                    preset={preset}
                    activateTool={activateTool}
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    undoCanvasAction={undoCanvasAction}
                    clearCanvas={clearCanvas}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </button>
      ) : null}
    </Preset>
  );
}
export default connect(select, mapToDispatchProps)(Presets);
const Preset = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  position: relative;
  width: 100%;
  height: min-content;
  &:after {
    transition: 0.2s ease;
    display: block;
    content: "";
    width: 3px;
    height: 100%;
    background-color: ${({ theme }) => theme.toolbar.highlight_color};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%)
      ${({ activeTool }) => (activeTool ? "scale(1)" : "scale(0)")};
  }
  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: 57px;
      &:hover {
        /* background-color: rgba(0, 0, 0, 0.05); */
        /* border-left: 3px solid ${({ theme }) =>
          theme.toolbar.highlight_color}; */
        &:after {
          transform: translate(0, -50%) scaleY(1);
        }
      }
      &.active {
        background-color: rgba(0, 0, 0, 0.05);
      }
    `}
  background-color: ${some_grey};
  cursor: pointer;

  .extension-button {
    width: 10px;
    background: none;
    border: none;
    outline: none;
    position: absolute;
    bottom: 0;
    right: 5px;
    cursor: pointer;
    &:focus {
      .extension {
        pointer-events: all;
        opacity: 1;
        transform: translate(0, -100%);
      }
    }
  }
  .extension {
    display: flex;
    transition: 0.5s ease-in-out;
    position: absolute;
    top: 50%;
    left: calc(100% + 20px);
    transform: translate(-100px, -100%);
    list-style: none;
    justify-content: space-around;
    align-items: center;
    width: max-content;
    height: 50px;
    background-color: ${some_grey};
    border-radius: 8px;
    padding: 0 10px;
    z-index: -1;
    box-shadow: ${({ theme }) => theme.shadow._1};
    opacity: 0;
    pointer-events: none;
    &:before {
      display: block;
      content: "";
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-right: 10px solid ${some_grey};
      border-bottom: 8px solid transparent;
      position: absolute;
      top: 50%;
      left: -10px;
      transform: translate(0, -50%);
    }
    li {
      margin: 0 2px;
    }
    img {
      pointer-events: none;
    }
  }
`;
