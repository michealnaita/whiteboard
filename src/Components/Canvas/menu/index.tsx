import React from "react";
import { Menu } from "./styled";
import { connect } from "react-redux";
import { changeStrokeSize } from "../../../logic/redux/ducks/canvas";

const defaultColors = ["#E8E8E8", "#0E0E0E", "#C65656", "#214029", "#3E3121"];

function select(state) {
  return {
    strokeSize: state.canvas.strokeSize,
  };
}
function mapToDispatchProps(dispatch) {
  return {
    setStrokeSize: (size) => dispatch(changeStrokeSize(size)),
  };
}

function MenuPrompt({
  strokeSize,
  setStrokeSize,
}: {
  strokeSize?: number;
  setStrokeSize?: Function;
}) {
  return (
    <Menu>
      <div>
        <h4>
          Stroke Width: <em>{strokeSize}px</em>
        </h4>
        <div>
          <input
            type="range"
            min="1"
            max="10"
            className="real-slider"
            value={strokeSize.toString()}
            onChange={(e) => setStrokeSize(e.target.value)}
          />
          <div className="slider">
            <div className="bar" />
            <div className="knob" />
          </div>
        </div>
      </div>
      <div>
        <h4>Canvas Preset</h4>
        <ul className="canvas-presets">
          {defaultColors.map((color, i) => (
            <li key={i} style={{ backgroundColor: color }}></li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Toolbar</h4>
        <div className="toolbar-theme">
          <div>
            <img
              src="assets/icons/toolbar_theme-light.svg"
              alt=""
              width="100%"
            />
          </div>
          <div className="separator" />
          <div>
            <img
              src="assets/icons/toolbar_theme-dark.svg"
              alt=""
              width="100%"
            />
          </div>
        </div>
      </div>
    </Menu>
  );
}

export default connect(select, mapToDispatchProps)(MenuPrompt);
