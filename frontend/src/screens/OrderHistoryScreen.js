import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {listOrder} from "../actions/orderActions";

const OrderHistoryScreen = (props) => {
    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrder());
    }, [dispatch]);

    return (
        <div>
            <h1 className="page-title">Order History</h1>
            {loading ?
                <LoadingBox/> :
                error ?
                    <MessageBox variant="danger">{error}</MessageBox> :
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Order#</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Shipped</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidOn.substring(0, 10) : 'No'}</td>
                                <td>{order.isShipped ? order.shippedOn.substring(0, 10) : 'No'}</td>
                                <td>
                                    <button type="button" className="small secondary" onClick={() => {
                                        props.history.push(`/order/${order._id}`);
                                    }}>Details</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default OrderHistoryScreen;