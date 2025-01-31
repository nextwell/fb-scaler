import settings from "./containers/settings";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { store } from "./store/store.jsx";

import WebPage from "./containers/WebPage.jsx";

import "./index.css";

import { fetchProxies } from "./actions/actionProxy.jsx";
import { fetchUsers } from "./actions/actionUser.jsx";
import { fetchTemplatesCampaigns } from "./actions/actionTemplateCampaign";

let app = document.getElementById("root");

let url = settings.url;

function loadData() {
    store.dispatch(fetchProxies(`${url}/api/proxies`));
    store.dispatch(fetchUsers(`${url}/api/users`));
    store.dispatch(
        fetchTemplatesCampaigns(`${url}/api/campaigns/template/list`)
    );
}

class App extends React.Component {
    componentDidMount() {
        loadData();
        console.log("Loading data...");
    }
    render() {
        return (
            <Provider store={store}>
                <WebPage />
            </Provider>
        );
    }
}

ReactDOM.render(<App />, app);
