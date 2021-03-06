import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsOrder, payOrder} from "../actions/orderActions";
import Axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_PAY_RESET} from "../constants/orderConstants";
import {backendUrl} from "../constants/urlConstants";

const OrderDetailsScreen = (props) => {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const {error: errorPay, success: successPay, loading: loadingPay} = orderPay;

    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const {data} = await Axios.get(backendUrl + '/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        //load order for one of the following cases
        //- it's not yet loaded
        //- successPay is true, reload the order with updated status
        //- order id doesn't match the id in the url
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    return loading ?
        (<LoadingBox/>) :
        error ?
            (<MessageBox variant="danger">{error}</MessageBox>) :
            (
                <div className="order-details-screen">
                    <h1 className="page-title">Order Summary</h1>
                    <h2>Order Number: {order._id}</h2>
                    <div className="row top">
                        <div className="col-2 col-right-margin">
                            <ul>
                                <li>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                                        <strong>Address:</strong> {order.shippingAddress.suiteNumber !== '' ? order.shippingAddress.suiteNumber + " - " : ""}{order.shippingAddress.streetAddress},
                                        {order.shippingAddress.city}, {order.shippingAddress.province}, {order.shippingAddress.postalCode} <br/>
                                        <strong>Phone:</strong> {order.shippingAddress.phoneNumber}
                                    </p>
                                    {order.isShipped ?
                                        <MessageBox variant="success">Status: Shipped on {order.shippedOn}</MessageBox> :
                                        <MessageBox variant="danger">Status: Not yet shipped</MessageBox>
                                    }
                                </li>
                                <li>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Payment Method:</strong> {order.paymentMethod}
                                    </p>
                                    {order.isPaid ?
                                        <MessageBox variant="success">Status: Paid on {order.paidOn}</MessageBox> :
                                        <MessageBox variant="danger">Status: Not yet paid</MessageBox>
                                    }
                                </li>
                                <li>
                                    <h2>Order Items</h2>
                                    <ul className="order-items">
                                        {
                                            order.orderItems.map(item => (
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

                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>{order.orderItems.reduce((a,c) => a + c.qty, 0)} Items</div>
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>${order.tax.toFixed(2)}</div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div><strong>Total</strong></div>
                                            <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                        </div>
                                    </li>
                                    {!order.isPaid && (
                                        <li>
                                            {!sdkReady ? <LoadingBox/> :
                                                <>
                                                    {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                    {loadingPay && <LoadingBox/>}
                                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                                </>
                                            }
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
};

export default OrderDetailsScreen;