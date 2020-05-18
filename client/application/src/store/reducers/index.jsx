import { combineReducers } from "redux";
import UserReducers from "./user.jsx";
import ProxyReducers from "./proxy.jsx";
import TCampaigns from "./template_campaign";

const allReducers = combineReducers({
    users: UserReducers,
    proxies: ProxyReducers,
    tcampaigns: TCampaigns,
});

export default allReducers;
