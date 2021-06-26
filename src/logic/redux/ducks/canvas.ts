import Storage from "../../../helpers/useLocalStorage";

const [strokeColorLocal] = Storage("stroke_color");

const CHANGE_TOOL = "CHANGE_TOOL";
const CHANGE_STROKE_COLOR = "CHANGE_STROKE_COLOR";
const CHANGE_STROKE_SIZE = "CHANGE_STROKE_SIZE";
const UNDO = "UNDO";
const CLEAR_ALL = "CLEAR_ALL";

const INITIAL_STATE = {
  strokeSize: 1,
  strokeColor: strokeColorLocal || "#000000",
  activeTool: "pencil",
};
interface stateInterface {
  strokeSize: number;
  strokeColor: string;
  activeTool: string;
}
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
    default:
      return state;
  }
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
export function changeStrokeSize(size: number) {
  return {
    type: CHANGE_STROKE_COLOR,
    payload: {
      size,
    },
  };
}
