import styled, { css } from "styled-components";

export const Menu = styled.div`
  transition: transform 0.2s ease-out, opacity 0.3s ease-out;
  transform-origin: top;
  transform: translateY(-50px) scaleY(0.2);
  opacity: 0;
  ${({ theme }) => theme.flex("space-around", "left", "column")}
  position: absolute;
  width: 220px;
  min-height: 300px;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 15px;
  box-shadow: ${({ theme }) => theme.shadow._1};
  z-index: 10;
  ${({ hide }) =>
    hide &&
    css`
      opacity: ${hide.status ? "1" : "0"};
      transform: translateY(${hide.status ? "0" : ""})
        scaleY(${hide.status ? "1" : "0"});
      left: ${hide.position[0].toString() + "px"};
      top: ${hide.position[1].toString() + "px"};
    `};
  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    img {
      pointer-events: none;
    }
  }
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
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: #202020;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        cursor: pointer;
      }
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
        cursor: pointer;
        width: 100%;
        img {
          margin-right: 10px;
          pointer-events: none;
        }
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
