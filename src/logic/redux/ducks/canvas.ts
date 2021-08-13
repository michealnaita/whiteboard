import Storage from "../../../helpers/useLocalStorage";

const CHANGE_TOOL = "CHANGE_TOOL";
const CHANGE_STROKE_COLOR = "CHANGE_STROKE_COLOR";
const CHANGE_STROKE_SIZE = "CHANGE_STROKE_SIZE";
const UNDO = "UNDO";
const CLEAR_ALL = "CLEAR_ALL";
const SET_CANVAS_METHODS = "SET_CANVAS_METHODS";
const CHANGE_TOOLBAR_THEME = "CHANGE_TOOLBAR_THEME";

const [strokeColorLocal] = Storage("stroke_color");
const [canvasColorLocal] = Storage("canvas_color");
const [strokeSizeLocal] = Storage("stroke_size");
const [toolbarThemeLocal] = Storage("toolbar_theme");

interface stateInterface {
  strokeSize: number;
  strokeColor: string;
  activeTool: string;
  canvasMethods: {};
  canvasColor: string;
  toolbarTheme: string;
}
const INITIAL_STATE = {
  strokeSize: strokeSizeLocal || 2,
  strokeColor: strokeColorLocal || "#000000",
  activeTool: "pencil",
  canvasColor: canvasColorLocal || "#E8E8E8",
  toolbarTheme: toolbarThemeLocal || "dark",
  canvasMethods: {},
};

export default function canvasReducer(
  state = INITIAL_STATE,
  action
): stateInterface {
  switch (action.type) {
    case CHANGE_TOOL:
      return { ...state, activeTool: action.payload.tool };
    case CHANGE_STROKE_COLOR:
      return { ...state, strokeColor: action.payload.color };
    case CHANGE_STROKE_SIZE:
      return { ...state, strokeSize: action.payload.size };
    case CHANGE_TOOLBAR_THEME:
      return { ...state, toolbarTheme: action.payload.mode };
    case SET_CANVAS_METHODS:
      return {
        ...state,
        canvasMethods: {
          ...action.payload.methods,
        },
      };
    default:
      return state;
  }
}
export function canvasMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      const { canvas } = getState();
      const { canvasMethods } = canvas;
      if (canvasMethods) {
        if (action.type === CLEAR_ALL) canvasMethods.clearCanvasMethod();
        if (action.type === UNDO) canvasMethods.undoCanvasMethod();
      }
      return next(action);
    };
  };
}
export function changeTool(tool: string) {
  return {
    type: CHANGE_TOOL,
    payload: {
      tool,
    },
  };
}
export function changeStrokeColor(color: string) {
  return {
    type: CHANGE_STROKE_COLOR,
    payload: {
      color,
    },
  };
}
export function setStrokeSize(size: number) {
  return {
    type: CHANGE_STROKE_SIZE,
    payload: {
      size,
    },
  };
}

export function clearCanvas() {
  return {
    type: CLEAR_ALL,
  };
}
export function undoCanvasAction() {
  return {
    type: UNDO,
  };
}
export function setCanvasMethods(methods: {
  clearCanvasMethod: Function;
  undoCanvasMethod: Function;
}) {
  return {
    type: SET_CANVAS_METHODS,
    payload: {
      methods,
    },
  };
}
export function setToolbarTheme(mode) {
  return {
    type: CHANGE_TOOLBAR_THEME,
    payload: { mode },
  };
}
