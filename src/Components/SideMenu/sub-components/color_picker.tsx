import React, { useRef, useState, useEffect, Component } from "react";
import styled, { css } from "styled-components";
import { isConstructorDeclaration } from "typescript";
import useLocalStoraage from "./useLocalStorage";
import { changeStrokeColor } from "../../../logic/redux/ducks/canvas";
import { connect } from "react-redux";

function select(state) {
  return {
    strokeColor: state.canvas.strokeColor,
  };
}
function mapToDispatchProps(dispatch) {
  return {
    setStrokeColor: (color) => dispatch(changeStrokeColor(color)),
  };
}

const defaultColors = ["#ffb500", "#f55b5b"];
function ColorPicker({
  setStrokeColor,
  strokeColor,
}: {
  setStrokeColor?: Function;
  strokeColor?: string;
}) {
  // element references
  let inputRef: any = useRef(null);
  let colorButtonRef: any = useRef(null);

  // basic state
  const [colors, setColors] = useState(defaultColors);
  const [storedColors, setStoredColors] = useLocalStoraage("custom_colors");
  const [strokeColorLocal, setStrokeColorLocal] =
    useLocalStoraage("stroke_color");
  // const [strokeColor, setStrokeColor] = useState(strokeColorLocal || "#f55b5b");
  const [removeMessage, toggleRemoveMessage] = useState(false);

  // This function stores the stroke color locallly
  useEffect(() => {
    setStrokeColorLocal("stroke_color", strokeColor);
  }, [strokeColor]);

  // This function Bring up generic color picker by clicking the input of type color
  function triggerColorPicker(colorButtonRef) {
    if (!inputRef) return;
    inputRef.addEventListener("focusout", (e) => {
      storeCustomColor(e.target.value);
      colorButtonRef.focus();
      return e.target.removeEventListener("focusout", () => {
        console.log("removed");
      });
    });
    inputRef.click();
    inputRef.focus();
  }

  // this function stores a custom color in the local storage
  function storeCustomColor(strokeColor) {
    const customColors = storedColors || [];
    const matchedColor = customColors.filter((color) => color === strokeColor);
    if (matchedColor.length) return;
    const updatedCustomColors = customColors.concat([strokeColor]);
    setStoredColors("custom_colors", updatedCustomColors);
    setColors(defaultColors.concat(updatedCustomColors));
  }

  // This function removes a stored color from local storage
  function removeCustomColor(value) {
    const customColors = storedColors || [];
    const matchedColors = customColors.filter((color) => color !== value);
    setStoredColors("custom_colors", matchedColors);
    const newColorBanch = defaultColors.concat(matchedColors);
    const newStrokeColor = newColorBanch[newColorBanch.length - 1];
    setStrokeColor(newStrokeColor);
    setColors(newColorBanch);
    toggleRemoveMessage(false);
  }

  // This function brings up menu on left click
  function handleClick(e, value) {
    e.preventDefault();
    if (value !== strokeColor) return;
    toggleRemoveMessage(true);
  }

  /*
  this function loads the stored colors in local storage 
  and adds an event listener for when a user focuses of  the color picker
   */
  useEffect(() => {
    setColors(defaultColors.concat(storedColors || []));
    if (colorButtonRef) {
      colorButtonRef.addEventListener("focusout", () => {
        toggleRemoveMessage(false);
      });
    }
    return inputRef.removeEventListener(
      "focusout",
      () => {},
      setStrokeColorLocal("stroke_color", strokeColor)
    );
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Color strokeColor={strokeColor} ref={(el) => (colorButtonRef = el)}>
        <PresetColors
          removeMessage={removeMessage}
          onClick={() => toggleRemoveMessage(false)}
        >
          {colors.map((color, i) => (
            <li
              style={{ backgroundColor: color }}
              className={strokeColor === color ? "selected" : ""}
              key={i}
              onClick={() => setStrokeColor(color)}
              onContextMenu={(e) => handleClick(e, color)}
            >
              <div onClick={() => removeCustomColor(color)}>remove</div>
            </li>
          ))}
          <li
            className="add-color"
            onClick={() => triggerColorPicker(colorButtonRef)}
          >
            <img src="assets/icons/add.svg" width="20px" alt="" />
          </li>
        </PresetColors>
        <input
          type="color"
          ref={(el) => (inputRef = el)}
          onChange={({ target }) => setStrokeColor(target.value)}
          className="input-color-picker"
        />
      </Color>
    </div>
  );
}

export default connect(select, mapToDispatchProps)(ColorPicker);

const other_grey = "#202020";
const shadow = " 0px 3px 6px rgba(0, 0, 0, 0.5)";
const PresetColors = styled.ul`
  list-style: none;
  transition: 0.2s ease-out;
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translate(10px, -50%) scale(0);
  width: 162px;
  height: 150px;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 20px);
  grid-template-rows: repeat(auto-fit, 20px);
  grid-gap: 5px;
  border-radius: 8px;
  background-color: white;
  box-shadow: ${shadow};
  opacity: 0;
  pointer-events: none;
  li {
    height: 20px;
    width: 20px;
    border-radius: 2px;
    border: 1px solid #b8b5b5;
    cursor: pointer;
    position: relative;
    div {
      display: none;
      cursor: pointer;
      position: absolute;
      background-color: white;
      padding: 5px 10px;
      border: 1px solid #b8b5b5;
      border-radius: 3px;
      width: max-content;
      bottom: calc(100% + 5px);
      left: 0;
      &:hover {
        background-color: #a3a3a3;
      }
    }
    &.add-color {
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: 600;
      img {
        pointer-events: none;
      }
    }
    &.selected {
      border: 2px solid #1c80c4;
      div {
          ${({ removeMessage }) =>
            removeMessage &&
            css`
              display: block;
            `}}
      }
    }
  }
  & + .input-color-picker {
    position: absolute;
    top: -100px;
    left: 110px;
    opacity: 0;
    pointer-events: none;
  }
`;
const Color = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  border: 3px solid ${other_grey};
  background-color: ${({ strokeColor }) => strokeColor || "#f55b5b"};
  box-shadow: ${shadow};
  outline: none;
  position: relative;
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0) 45%
    );
    /* background-color: red; */
  }
  &:focus {
    ${PresetColors} {
      opacity: 1;
      transform: translate(10px, -50%) scale(1);
      pointer-events: all;
    }
  }
`;

// export  class ColorPicker2 extends Component {
//     state = {
// colors:[],
// storedColors:[],
//     }
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }
