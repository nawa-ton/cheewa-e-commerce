import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstant";

export const cartReducer = (state = {cartItems:[]}, action) => {
    switch (action.type){
        case CART_ADD_ITEM:
            const item = action.payload; //item to be added to the cart
            const existItem = state.cartItems.find(x => x.product === item.product) //check if the product is already added by comparing product id
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x) //If the item is already in cartItem, update it to the new one.
                }
            }else {
                return {...state, cartItems: [...state.cartItems, item]} //append new item to the end of cartItem
            }
        case CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter(x => x.product !== action.payload)};
        default:
            return state;
    }
}