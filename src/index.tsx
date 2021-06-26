import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./logic/redux/store";

ReactDOM.render(
  <Provider store={store}>
    <div>here</div>
  </Provider>,
  document.getElementById("root")
);