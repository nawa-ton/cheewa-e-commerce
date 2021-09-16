import {
    CART_ADD_ITEM, CART_EMPTY,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const cartReducers = (state = {cartItems:[]}, action) => {
    switch (action.type){
        case CART_ADD_ITEM:
            const item = action.payload; //item to be added to the cart
            const existItem = state.cartItems.find(x => x.product === item.product) //check if the product is already added by comparing product id
            if(existItem){
                return {
                    //return previous state + cartItems
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x) //If the item is already in cartItem, update it to the new one.
                }
            }else {
                return {...state, cartItems: [...state.cartItems, item]} //append new item to the end of cartItem
            }
        case CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter(x => x.product !== action.payload)};
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload};
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload};
        case CART_EMPTY:
            return {...state, cartItems: []};
        default:
            return state;
    }
}