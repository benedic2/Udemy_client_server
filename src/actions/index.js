import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from './types';

const ROOT_URL = 'http://localhost:3090';


export function signinUser({email, password}) {
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signin`, {email, password})
    //Submit email password to API server
 
        .then(response=>{
    //if request is good 
    //update state to indicate auth'd
            dispatch({type: AUTH_USER});
    // save JWT token
            localStorage.setItem('token', response.data.token);
    //redirect to feature
            browserHistory.push('/feature');
        })
        .catch((error)=>{
    //If request is bad then show an error 
    // redirect? 
            console.log(error)
            dispatch(authError('Bad login info'));
        });
    }
}

export function signupUser({email, password}) {
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signup`, {email, password})
 

        .then(response=>{
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
        .catch(error => dispatch(authError(error.response.data.error)));
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
        
    }
}

export function signoutUser() {
    //Get rid of local storage token. functionally the browser will not recognize the user
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
}

export function fetchMessage() {
    return function(dispatch){
        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response=>{
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
        });
    }
}


//function automatically called with the dispatch action creator
//makes actions smarter 