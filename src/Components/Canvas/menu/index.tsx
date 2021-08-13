import React, { useEffect } from "react";
import { Menu } from "./styled";
import { connect } from "react-redux";
import * as actions from "../../../logic/redux/ducks/canvas";
import useLocalStoraage from "../../../helpers/useLocalStorage";

const defaultColors = [
  "#E8E8E8",
  "#0E0E0E",
  "#C65656",
  "#214029",
  "#3E3121",
  "#000000",
];

function select(state) {
  return {
    strokeSize: state.canvas.strokeSize,
  };
}
function mapToDispatchProps(dispatch) {
  return {
    setStrokeSize: (size) => dispatch(actions.setStrokeSize(size)),
    setToolbarTheme: (mode) => dispatch(actions.setToolbarTheme(mode)),
  };
}

function MenuPrompt({
  strokeSize,
  setStrokeSize,
  displayMenu,
  setCanvasColor,
  setDisplayMenu,
  setToolbarTheme,
}: {
  strokeSize?: number;
  setStrokeSize?: Function;
  setCanvasColor: Function;
  setDisplayMenu: Function;
  setToolbarTheme: Function;
  displayMenu: {
    status: Boolean;
    position: Number[];
  };
}) {
  const [strokeSizeLocal, setStrokeSizeLocal] = useLocalStoraage("stroke_size");
  useEffect(() => {
    setStrokeSizeLocal("stroke_size", strokeSize);
  }, [strokeSize]);
  function closeMenu() {
    setDisplayMenu({
      ...displayMenu,
      status: false,
    });
  }
  return (
    <Menu hide={displayMenu}>
      <div className="close" onClick={closeMenu}>
        <img src="assets/icons/close.svg" />
      </div>
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
            value={strokeSize}
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
            <li
              key={i}
              style={{ backgroundColor: color }}
              onClick={() => setCanvasColor(color)}
            ></li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Toolbar</h4>
        <div className="toolbar-theme">
          <div onClick={() => setToolbarTheme("light")}>
            <img
              src="assets/icons/toolbar_theme-light.svg"
              alt=""
              width="20px"
            />
            <em>light</em>
          </div>
          <div onClick={() => setToolbarTheme("dark")}>
            <img
              src="assets/icons/toolbar_theme-dark.svg"
              alt=""
              width="20px"
            />
            <em>dark</em>
          </div>
        </div>
      </div>
    </Menu>
  );
}

export default connect(select, mapToDispatchProps)(MenuPrompt);
