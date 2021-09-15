import styled, { css } from "styled-components";

export const InputContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 200px;
  display: none;
  font-size: 30px;
  font-family: monospace;
  ${({ show }) =>
    show.status &&
    css`
      display: flex;
      left: ${(show.position[0] - 10).toString() + "px"};
      top: ${(show.position[1] - 10).toString() + "px"};
    `}
`;
export const Input = styled.textarea`
  width: 200px;
  height: 50px;
  border: 1px dashed #f5f5f5;
  border-radius: 5px;
  background: none;
  outline: none;
  color: ${({ fontColor }) => fontColor};
  padding: 10px;
  font-size: ${({ fontSize }) => fontSize.toString() + "px"};
  font-family: Arial;
  line-height: normal;
`;

export const Controllers = styled.div`
  height: max-content;
  div {
    margin-left: 5px;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    transition: 0.2s ease;
    cursor: pointer;
    ${({ theme }) => theme.flex("center", "center")}
    &:hover {
      /* background-color: rgba(225, 225, 225, 0.5); */
    }
  }
`;
