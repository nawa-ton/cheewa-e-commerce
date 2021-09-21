import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod, saveShippingAddress} from "../actions/cartActions.js";

const ShippingScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    if(!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [streetAddress, setStreetAddress] = useState(shippingAddress.streetAddress);
    const [suiteNumber, setSuiteNumber] = useState(shippingAddress.suiteNumber);
    const [city, setCity] = useState(shippingAddress.city);
    const [province, setProvince] = useState(shippingAddress.province);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, streetAddress, suiteNumber, city, province, postalCode, phoneNumber}));
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
        //props.history.push('/payment');
    }

    return (
        <div>
            {/*<CheckoutSteps step1/>*/}
            <form className="form" onSubmit={submitHandler}>
                <fieldset>
                    <legend className="page-title">Shipping Address</legend>
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" value={fullName} required onChange={e => setFullName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="streetAddress">Street Address</label>
                        <input type="text" id="streetAddress" value={streetAddress} required onChange={e => setStreetAddress(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="suiteNumber">Suite/Apartment Number</label>
                        <input type="text" id="suiteNumber" value={suiteNumber} onChange={e => setSuiteNumber(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" value={city} required onChange={e => setCity(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="province">Province</label>
                        <input type="text" id="province" value={province} required onChange={e => setProvince(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input type="text" id="postalCode" value={postalCode} required onChange={e => setPostalCode(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    </div>
                </fieldset>

                {/*<div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>*/}

                <fieldset>
                    <legend className="page-title">Payment Method</legend>
                    <div className="radio-wrapper">
                        <div className="radio">
                            <input
                                type="radio"
                                id="paypal"
                                value="PayPal"
                                name="paymentMethod"
                                required
                                checked
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                        <div className="radio">
                            <input
                                type="radio"
                                id="stripe"
                                value="Stripe"
                                name="paymentMethod"
                                required
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="stripe">Stripe</label>
                        </div>
                    </div>
                </fieldset>
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    );
};

export default ShippingScreen;