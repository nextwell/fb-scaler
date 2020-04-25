import { combineReducers } from "redux";
import UserReducers from "./user.jsx";
import ProxyReducers from "./proxy.jsx";

const allReducers = combineReducers({
    user: UserReducers,
    proxy: ProxyReducers,
});

export default allReducers;
