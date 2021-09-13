import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {productDetailsReducer, productListReducer} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducer";

const initialState = {
    cart: {
        cartItems: (localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

//For displaying redux in browser dev console
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store cart items on local
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;