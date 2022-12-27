import { combineReducers } from "redux";
import { EmpReducers } from "./EmpReducers";

export const totalReducers = combineReducers({
  employees:EmpReducers
})