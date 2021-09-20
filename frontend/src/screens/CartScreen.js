import React, {useEffect} from 'react';
import {addToCart, removeFromCart} from "../actions/cartActions";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../components/MessageBox";
import {Link} from "react-router-dom";

const CartScreen = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search ?
        Number(props.location.search.split('=')[1]) :
        1;

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    function checkoutHandler() {
        //redirect to signin screen
        props.history.push('/signin?redirect=shipping');
    }

    return (
        <div className="row top cart-screen">
            <h1 className="full-width page-title">Your cart</h1>
            <div className="col-2 right-margin">
                {
                    cartItems.length === 0 ?
                        <MessageBox>
                            Your cart is empty.
                            <Link to="/"> Go Shopping</Link>
                        </MessageBox> :
                        <ul>
                            {
                                cartItems.map(item => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div className="cart-thumbnail">
                                                <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} className="cover"/></Link>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x + 1}
                                                                    value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>${item.price}</div>
                                            <div>
                                                <button type="button" className="button-icon" onClick={() => removeFromCartHandler(item.product)}><i className="fa fa-trash fa-lg"/></button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                }
            </div>
            <div className="col-1 left-margin">
                <div className="card">
                    <ul>
                        <li>
                            <h1>
                                {cartItems.reduce((a, c) => a + c.qty, 0)} items <br/>
                                Subtotal: ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h1>
                        </li>
                        <li>
                            {
                                cartItems.length === 0 ?
                                    <></> :
                                    <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>Proceed to Checkout</button>
                            }
                        </li>
                    </ul>
                </div>
                {
                    cartItems.length === 0 ? <></> :  <Link to="/"> Continue Shopping</Link>
                }
            </div>
        </div>
    );
};

export default CartScreen;