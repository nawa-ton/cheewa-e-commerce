import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS
} from "../constants/userConstants";
import Axios from "axios";
import {backendUrl} from "../constants/urlConstants";

export const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload:{email, password}});
    try{
        const {data} = await Axios.post(backendUrl + '/api/users/register', {name, email, password});
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: generateErrorMsg(error)
        })
    }
};

export const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload:{email, password}});
    try{
        const {data} = await Axios.post(backendUrl + '/api/users/signin', {email, password});
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: generateErrorMsg(error)
        })
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_SIGNOUT
    });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST, payload: userId});
    const {userSignin: {userInfo}} = getState();
    try{
        const {data} = await Axios.get(backendUrl +`/api/users/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: USER_DETAILS_SUCCESS, payload: data
        });
    }catch (error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: generateErrorMsg(error)
        });
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({type: USER_UPDATE_REQUEST, payload: user});
    const {userSignin: {userInfo}} = getState();
    try{
        const { data } = await Axios.put(backendUrl + '/api/users/profile', user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: USER_UPDATE_SUCCESS, payload: data
        });
        //for updating user name at the nav bar
        dispatch({
            type: USER_SIGNIN_SUCCESS, payload: data
        });
        dispatch({
            type: USER_DETAILS_SUCCESS, payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (error){
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: generateErrorMsg(error)
        });
    }
}

const generateErrorMsg = (error) => error.response && error.response.data.message ? error.response.data.message : error.message;

