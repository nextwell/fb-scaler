import * as types from "./../../actions/actionTypes.jsx";

function TCampaignReducer(
    state = {
        isLoading: false,
        data: {},
        error: false,
    },
    action = null
) {
    switch (action.type) {
        case types.RECV_TCampaigns:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data,
                error: false,
            });
        case types.REQ_TCampaigns:
            return Object.assign({}, state, { isLoading: true, error: false });
        default:
            return state;
    }
}

export default TCampaignReducer;
