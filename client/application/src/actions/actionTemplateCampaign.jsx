import axios from "axios";
import * as types from "./actionTypes.jsx";

function requestTemplateCampaigns() {
    return { type: types.REQ_TCampaigns };
}

function receiveTemplateCampaigns(json) {
    return {
        type: types.RECV_TCampaigns,
        data: json,
    };
}

export function fetchTemplatesCampaigns(url) {
    return function (dispatch) {
        dispatch(requestTemplateCampaigns());
        return axios
            .get(url)
            .then(function (response) {
                dispatch(receiveTemplateCampaigns(response.data));
            })
            .catch(function (response) {
                console.log(response);
            });
    };
}
