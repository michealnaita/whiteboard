import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import Canvas from "../../Components/Canvas";
import canvasReducer from "./ducks/canvas";
import thunk from "redux-thunk";
export const GLOBAL_STATE = {
  canvas_settings: {
    strokeSize: "1",
    strokeColor: "#000000",
    activeTool: "pencil",
  },
  client: {
    bacKgroud_color: "",
    toolbar_theme: "light",
    recording: [],
    drawing: "",
  },
  session: {
    isSharedSession: false,
    members: [],
    allowedToAction: false,
    isAdmin: false,
    invite_link: "",
    current_frame: "",
  },
  auth: {
    isLogged: false,
    token: "",
    username: "",
    password: "",
  },
};
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// window.
const storeEnhancers = compose;
const rootReducer = combineReducers({
  //   client: clientReducer,
  //   auth: authReducer,
  canvas: canvasReducer,
  //   session: sessionReducer,
});
const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));
export default store;
// auth
// const LOG_OUT = "LOG_OUT";
// const LOG_IN = "LOG_IN";

// // client
// const SAVE_IMAGE = "SAVE_IMAGE";
// const RECORD_CANVAS = "RECORD_CANVAS";

// // session
// const CREATE_INVITE_LINK = "CREATE_INVITE_LINK";
// const START_SHARED_SESSION = "START_SHARED_SESSION";
// const END_SESSION = "END_SESSION";
