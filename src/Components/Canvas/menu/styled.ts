import styled, { css } from "styled-components";

export const Menu = styled.div`
  position: absolute;
  width: 220px;
  min-height: 300px;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 15px;
  right: 50%;
  ${({ theme }) => theme.flex("space-between", "left", "column")}
  h4 {
    color: #272727;
    font-weight: 500;
    margin-bottom: 10px;
  }
  div {
    height: 100%;
    .real-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 2px;
      background-color: #515151;
      outline: none;
      &::-webkit-slider-thumb,
      &::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: #202020;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        cursor: pointer;
      }
    }
    .slider {
      display: none;
      position: relative;
      .bar {
        width: 100%;
        height: 2px;
        background-color: #515151;
      }
      .knob {
        position: absolute;
        background-color: #202020;
        width: 16px;
        height: 16px;
        border-radius: 100%100%;
      }
    }
    .canvas-presets {
      display: grid;
      grid-template-columns: repeat(3, 35px);
      grid-template-rows: repeat(auto-fit, min-content);
      grid-gap: 5px;
      li {
        width: 35px;
        height: 25px;
        cursor: pointer;
      }
    }
    .toolbar-theme {
      ${({ theme }) => theme.flex("center", "center", "row")}
      div {
        width: 100%;
      }
      .separator {
        width: 1px;
        height: 60px;
        margin: 10px;
        background-color: #707070;
      }
    }
  }
`;
