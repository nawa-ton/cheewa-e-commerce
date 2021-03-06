import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {createOrder} from "../actions/orderActions";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const PlaceOrderScreen = (props) => {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 50 ? toPrice(0) : toPrice(7);
    cart.tax = toPrice(0.05 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.tax;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        //deconstruct cart and replace cartItems with orderItems
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    }

    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success])

    return (
        <div className="place-order-screen">
            {/*<CheckoutSteps step1 step2 step3/>*/}
            <div className="row top">
                <h1 className="page-title full-width">Order Summary</h1>
                <div className="col-2 col-right-margin">
                    <ul>
                        <li>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name:</strong> {cart.shippingAddress.fullName} <br/>
                                <strong>Address:</strong> {cart.shippingAddress.suiteNumber !== '' ? cart.shippingAddress.suiteNumber + "-" : ""} {cart.shippingAddress.streetAddress},
                                {cart.shippingAddress.city}, {cart.shippingAddress.province}, {cart.shippingAddress.postalCode} <br/>
                                <strong>Phone:</strong> {cart.shippingAddress.phoneNumber}
                            </p>
                        </li>
                        <li>
                            <h2>Payment</h2>
                            <p>
                                <strong>Payment Method:</strong> {cart.paymentMethod}
                            </p>
                        </li>
                        <li>
                            <h2>Order Items</h2>
                            <ul className="order-items">
                                {
                                    cart.cartItems.map(item => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div className="cart-thumbnail">
                                                    <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} className="cover"/></Link>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="col-1 col-left-margin">
                    <div className="card">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>{cart.cartItems.reduce((a,c) => a + c.qty, 0)} Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.tax.toFixed(2)}</div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block" type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length <= 0}>Place Order</button>
                            </li>
                            {loading && <LoadingBox/>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;