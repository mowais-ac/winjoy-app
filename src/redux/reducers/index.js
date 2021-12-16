import { combineReducers } from "redux";
import AppReducer from './AppReducer';
import SSE from "./SSE-reducer";
import Coins from "./Coins-reducer";
import Bell from "./Bell-reducer";

export default combineReducers({
  app: AppReducer,
  SSE,
  Coins,
  Bell,
});
