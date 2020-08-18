import {combineReducers} from "redux";
import projectReducer from "./project";
import authReducer from "./auth";

export default combineReducers({
    projects: projectReducer,
    auth: authReducer
})