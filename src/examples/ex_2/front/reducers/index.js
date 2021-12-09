import { combineReducers } from "redux";
import {tutorialsReducer ,tutorialReducer} from "./tutorials";

export default combineReducers({
  tutorials : tutorialsReducer,
  tutorial : tutorialReducer,
});


