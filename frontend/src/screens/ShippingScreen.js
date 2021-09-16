import React, {useState} from 'react';
import CheckoutSteps from "../components/checkoutSteps";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartActions.js";

const ShippingScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

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
        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutSteps step1 step2/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
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
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    );
};

export default ShippingScreen;