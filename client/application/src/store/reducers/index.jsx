import { combineReducers } from "redux";
import ConfigReducers from "./config.jsx";
import UserReducers from "./user.jsx";

const allReducers = combineReducers({
    user: UserReducers,
    config: ConfigReducers,
});

export default allReducers;
