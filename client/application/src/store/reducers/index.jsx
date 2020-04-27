import { combineReducers } from "redux";
import UserReducers from "./user.jsx";
import ProxyReducers from "./proxy.jsx";

const allReducers = combineReducers({
    users: UserReducers,
    proxies: ProxyReducers,
});

export default allReducers;
