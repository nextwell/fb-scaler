import * as types from "./../../actions/actionTypes.jsx";

function proxyReducer(
    state = {
        isLoading: false,
        data: [],
        error: false,
    },
    action = null
) {
    switch (action.type) {
        case types.RECV_PROXY:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data,
                error: false,
            });
        case types.REQ_PROXY:
            return Object.assign({}, state, { isLoading: true, error: false });
        case types.REQ_PROXY_DELETE: {
            const proxyId = action.data;
            let updatedData = state.data.filter(
                (proxy) => proxy._id !== proxyId
            );

            return Object.assign({}, state, {
                isLoading: true,
                data: updatedData,
                error: false,
            });
        }
        default:
            return state;
    }
}

export default proxyReducer;
