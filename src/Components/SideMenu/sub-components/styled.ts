import styled, { css } from "styled-components";
const some_grey = "#292929";
const some_other_grey = "#272727";

const shadow = " 0px 3px 6px rgba(0, 0, 0, 70%)";
const shadow2 = " 0px 3px 6px rgba(0, 0, 0, 0.1)";

// index styles
export const SideMenu = styled.div`
  transition: 0.5s;
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
  width: 90px;
  height: 450px;
  border-radius: 15px;
  background-color: ${some_grey};
  box-shadow: ${shadow};
  z-index: 10;
  ${({ hide }) =>
    hide &&
    css`
      left: -90px;
    `}
  .presets {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;
export const PullOut = styled.div`
  position: absolute;
  top: 50%;
  right: -22px;
  transform: translate(0, -50%);

  width: 22px;
  height: 65px;
  background-color: ${some_other_grey};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  /* padding-left: 5px; */
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    transition: 0.5s;
    pointer-events: none;
  }
  ${({ hide }) =>
    hide &&
    css`
      img {
        transform: rotateZ(180deg);
      }
      /* box-shadow: ${shadow}; */
    `}
`;
