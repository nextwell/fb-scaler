import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { store } from "./store/store.jsx";

import WebPage from "./containers/WebPage.jsx";

import "./index.css";

// import { fetchFiles } from './actions/actionFiles.jsx';
// import { fetchUser } from './actions/actionUser.jsx';

let app = document.getElementById("root");

// function loadData() {
// 	store.dispatch(fetchFiles('/api/files'));
// 	store.dispatch(fetchUser('/api/user'));
// };

class App extends React.Component {
    componentDidMount() {
        //loadData();
        console.log(1);
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
