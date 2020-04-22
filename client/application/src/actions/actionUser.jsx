import * as types from './actionTypes.jsx';
import axios from 'axios';

function requestUser() {
	return {type: types.REQ_USER}
};

function receiveUser(json) {
	return{
		type: types.RECV_USER,
		data: json
	}
};


export function fetchUser(url) {
	return function(dispatch) {
		dispatch(requestUser());
		return axios.get(url)
			.then(function(response) {
				dispatch(receiveUser(response.data));
			})
			.catch(function(response){
				console.log(response);
			})
	}
};