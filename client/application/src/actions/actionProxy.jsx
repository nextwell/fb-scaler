import axios from "axios";
import * as types from "./actionTypes.jsx";

function requestProxy() {
    return { type: types.REQ_PROXY };
}

function receiveProxy(json) {
    return {
        type: types.RECV_PROXY,
        data: json,
    };
}

export function fetchProxies(url) {
    return function (dispatch) {
        dispatch(requestProxy());
        return axios
            .get(url)
            .then(function (response) {
                dispatch(receiveProxy(response.data));
            })
            .catch(function (response) {
                console.log(response);
            });
    };
}
