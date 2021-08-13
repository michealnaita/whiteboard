import React, { useState, useRef } from "react";
import { Controllers, Input, InputContainer } from "./styled";

export default function TextInput({
  insertText: insertCanvasText,
  fontColor,
  activeTool,
  show,
  setShowTextInput,
}: {
  insertText: Function;
  fontColor: string;
  activeTool: string;
  setShowTextInput: Function;
  show: {
    status: boolean;
    position: number[];
  };
}) {
  let inputRef: any = useRef(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(20);
  function insertText() {
    if (!inputRef) return;
    const lineHeight = fontSize * 1.2;
    const x = show.position[0] + 1;
    const y = show.position[1] + lineHeight;
    const width = inputRef.offsetWidth - 20;
    insertCanvasText({
      startX: x,
      startY: y,
      width: width,
      text: text,
      fontSize: 20,
      lineHeight: lineHeight,
    });
    hideInput();
    setText("");
  }
  function hideInput() {
    setShowTextInput({
      ...show,
      status: false,
    });
  }
  return (
    <InputContainer show={show}>
      <Input
        fontColor={fontColor}
        fontSize={fontSize}
        ref={(el) => (inputRef = el)}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Controllers>
        <div onClick={hideInput}>
          <img src="assets/icons/cancel.svg" width="20px" />
        </div>
        <div onClick={insertText}>
          <img src="assets/icons/check.svg" width="20px" />
        </div>
      </Controllers>
    </InputContainer>
  );
}
