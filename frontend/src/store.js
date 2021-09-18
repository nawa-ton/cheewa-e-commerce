import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {productDetailsReducer, productListReducer} from "./reducers/productReducers";
import {cartReducers} from "./reducers/cartReducers";
import {userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateReducer} from "./reducers/userReducers";
import {orderCreateReducer, orderDetailsReducer, orderListReducer, orderPayReducer} from "./reducers/orderReducers";

const initialState = {
    userSignin: {
        userInfo: (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },
    cart: {
        cartItems: (localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []),
        shippingAddress: (localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}),
        paymentMethod: 'PayPal'
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
});

//For displaying redux in browser dev console
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store cart items on local
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;