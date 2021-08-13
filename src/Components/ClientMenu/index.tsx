import { Console } from "console";
import React, { useRef, useEffect } from "react";
import { ClientInfo, Username, Menu } from "./styled";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function useTimer(max_time: number): [Number, Boolean, Function, Function] {
  let time = max_time;
  let isRunning = false;
  function start(cb: Function, new_time?: number) {
    if (time == 0) time = new_time || 1;
    isRunning = true;
    const count_down = setInterval(() => countDown(), 1000);
    function countDown() {
      if (time === 0) {
        clearInterval(count_down);
        isRunning = false;
        cb();
      }
      console.log(time);
      time -= 1;
    }
  }
  function reset() {
    time = max_time;
  }
  return [time, isRunning, start, reset];
}

export default function Index() {
  const [time, isRunning, start, reset] = useTimer(10);
  let menuButton: any = useRef();
  let menu: any = useRef(null);
  //   console.log(menuButton);
  function fadeOut(el) {
    el.addEventListener("mouseover", (e) => {
      if (isRunning) {
        reset();
      } else {
        start(setOpacity);
      }
    });
    start(setOpacity);
    function setOpacity() {
      el.style.opacity = 0.2;
    }
  }
  return (
    <ClientInfo ref={(el) => (menu = el)}>
      {/* <Username showName={false}>
        <div className="initials">MN</div>
        <div className="full-name">Micheal Naita</div>
      </Username>
      <div className="separator" /> */}
      <button ref={menuButton}>
        <img src="assets/icons/settings.svg" height="22px" />
        <Menu>
          <li className="user-info">
            <Username showName>
              <div className="initials">MN</div>
              <div className="full-name">Micheal Naita</div>
            </Username>
          </li>
          <li className="invite-link">
            <input type="text" readOnly value="invite link.com/invite"></input>
            <div>
              <p>
                {/* <FontAwesomeIcon icon="copy" /> */}
                copy Link
              </p>
            </div>
          </li>
          <li>
            <p>Save as Image</p>
          </li>
          <li>
            <p>Record canvas</p>
          </li>
          <li>
            <p>Start shared session</p>
          </li>
          <li>
            <p>End session</p>
          </li>
          <li className="logout-button">
            <p>LOG OUT</p>
          </li>
        </Menu>
      </button>
    </ClientInfo>
  );
}
