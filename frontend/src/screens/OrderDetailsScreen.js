import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsOrder} from "../actions/orderActions";

const OrderDetailsScreen = (props) => {
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId])

    return loading ?
        (<LoadingBox/>) :
        error ?
            (<MessageBox variant="danger">{error}</MessageBox>) :
            (
                <div>
                    <h1>Order Number: {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                                            <strong>Address:</strong> {order.shippingAddress.suiteNumber !== '' ? order.shippingAddress.suiteNumber + " - " : ""}{order.shippingAddress.streetAddress},
                                            {order.shippingAddress.city}, {order.shippingAddress.province}, {order.shippingAddress.postalCode} <br/>
                                            <strong>Phone:</strong> {order.shippingAddress.phoneNumber}
                                        </p>
                                        {order.isDelivered ?
                                            <MessageBox variant="success">Shipped on {order.deliveredOn}</MessageBox> :
                                            <MessageBox variant="danger">Not yet shipped</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Payment Method:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ?
                                            <MessageBox variant="success">Paid on {order.paidOn}</MessageBox> :
                                            <MessageBox variant="danger">Not yet paid</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {
                                                order.orderItems.map(item => (
                                                    <li key={item.product}>
                                                        <div className="row">
                                                            <div>
                                                                <img src={item.image} alt={item.name} className="small"/>
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
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
};

export default OrderDetailsScreen;