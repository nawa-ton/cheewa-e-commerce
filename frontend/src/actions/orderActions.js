import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS
} from "../constants/orderConstants";
import Axios from "axios";
import {CART_EMPTY} from "../constants/cartConstants";
import {backendUrl} from "../constants/urlConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE_REQUEST, payload: order
    });
    //getState returns all states in Redux store. Only need userInfo in userSignin
    const {userSignin: {userInfo}} = getState();
    try{
        //order: request payload
        const {data} = await Axios.post(backendUrl + '/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        console.log("order: " , order);
        dispatch({
            type: ORDER_CREATE_SUCCESS, payload: data.order
        });
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    }catch (error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: generateErrorMsg(error)
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DETAILS_REQUEST, payload: orderId
    });
    const {userSignin: {userInfo}} = getState();
    try{
        const {data} = await Axios.get(backendUrl + `/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_DETAILS_SUCCESS, payload: data
        });
    }catch (error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: generateErrorMsg(error)
        });
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: {order, paymentResult}
    });
    const {userSignin: {userInfo}} = getState();
    try{
        const {data} = await Axios.put(backendUrl + `/api/orders/${order._id}/pay`, paymentResult, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_PAY_SUCCESS, payload: data
        });
    }catch (error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: generateErrorMsg(error)
        });
    }
};

export const listOrder = () => async (dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try{
        const {data} = await Axios.get(backendUrl + '/api/orders/list', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_LIST_SUCCESS, payload: data
        });
    }catch (error){
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: generateErrorMsg(error)
        });
    }
}

const generateErrorMsg = (error) => error.response && error.response.data.message ? error.response.data.message : error.message;