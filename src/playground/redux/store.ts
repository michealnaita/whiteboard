import { createStore, combineReducers } from "redux";
import someReducer from "./ducks";
const rootReducer = combineReducers({ itemsList: someReducer });
const store = createStore(rootReducer);
export default store;
