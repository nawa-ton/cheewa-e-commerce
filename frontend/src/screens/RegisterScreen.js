import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const RegisterScreen = (props) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();

    const errorMsg = error && error.includes("E11000 duplicate key error collection") ? "This email address is already registered." : "";

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Password and confirm password does not match.")
        }else{
            dispatch(register(name, email, password));
        }
    }

    useEffect(() => {
        if(userInfo){
            //redirect to shipping screen or homepage
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 className="page-title">Create Account</h1>
                </div>
                {loading && <LoadingBox/>}
                {error && <MessageBox variant="danger">{errorMsg}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" required onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? {'  '} <Link to={`/signin?redirect=${redirect}`}>Sign in here.</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterScreen;