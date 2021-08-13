import styled, { css } from "styled-components";

const flex = (display, JC, AI, direction?) => `
display:${display};
flex-direction:${direction || "row"};
justify-content:${JC};
align-items:${AI};
`;
const BLUE_GREEN = "#0AA0C7";
export const Username = styled.div`
  ${flex("flex", "left", "center")}
  cursor: default;
  .initials {
    background-color: #32c1ad;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    border: 2px solid ${BLUE_GREEN};
    font-size: 14px;
    color: white;
    font-weight: 400;
    ${flex("flex", "center", "center")}
  }
  .full-name {
    display: none;
    margin-left: 16px;
    color: #515151;
    font-weight: 500;
    font-size: 18px;
    ${({ showName }) =>
      showName &&
      css`
        display: block;
      `}
  }
`;
export const Menu = styled.ul`
  position: absolute;
  transition: 0.2s ease-in-out;
  opacity: 0;
  pointer-events: none;
  transform-origin: top;
  top: calc(100% + 10px);
  right: 0;
  width: 250px;
  min-height: 250px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px 0;
  text-align: left;
  li {
    cursor: pointer;
    transition: 0.8s;
    opacity: 0;
    transition: 0.2s ease;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.menu_links};
    padding: 5px 15px;
    &:hover {
      background-color: #ececec;
    }
    &.user-info,
    &.user-info,
    &.logout-button,
    &.invite-link {
      &:hover {
        background: none;
      }
    }
    &.invite-link {
      text-align: left;
      font-size: 16px;
      margin: 8px 0;
      input {
        width: 100%;
        border: none;
        height: 25px;
        outline: none;
        padding: 8px;
      }
      p {
        margin-top: 10px;
        color: ${({ theme }) => theme.colors.blue};
      }
    }
    &.logout-button {
      text-align: center;
      padding: 8px 0;
      /* font-weight: 500; */
      &:hover {
        color: #515151;
      }
    }
  }
`;
export const ClientInfo = styled.div`
  transition: 0.3s ease;
  position: fixed;
  top: 10px;
  right: 10px;
  /* background-color: #d9d9d9; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 7px;
  height: 45px;
  /* width: 120px; */
  /* opacity: 0.2; */
  border-radius: 25px;
  z-index: 2;
  &:hover {
    opacity: 1 !important;
  }
  .separator {
    width: 2px;
    height: 100%;
    background-color: #b8b5b5;
    margin: 0 12px;
  }
  button {
    cursor: pointer;
    width: 25px;
    height: 38px;
    background: none;
    border: none;
    padding-top: 3px;
    /* background-color: red; */
    text-align: left;
    &:focus {
      ${Menu} {
        opacity: 1;
        pointer-events: all;
        li {
          opacity: 1;
        }
      }
    }
    img {
      pointer-events: none;
    }
  }
`;
