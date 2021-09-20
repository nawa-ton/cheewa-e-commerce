import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {detailsUser, updateUser} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {USER_UPDATE_RESET} from "../constants/userConstants";

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, user, error} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {success: successUpdate, loading: loadingUpdate, error: errorUpdate} = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        //load user details if it's null
        if(!user){
            dispatch({type: USER_UPDATE_RESET});
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [dispatch, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Password and confirm password does not match.");
        }else {
            dispatch(updateUser({userId: userInfo._id, name, email, password}));
            if(successUpdate){
                setShowSuccessMsg(true);
            }
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 className="page-title">Your Profile</h1>
                </div>
                {loading ?
                    <LoadingBox/> :
                    error ?
                        <MessageBox variant="danger">{error}</MessageBox> :
                        <>
                            {loadingUpdate && <LoadingBox/>}
                            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                            {showSuccessMsg && <MessageBox variant="success">Your profile update successfully</MessageBox>}
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input type="password" id="confirmPassword" placeholder="Confirm new password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div>
                                <label/>
                                <button className="primary" type="submit">Update</button>
                            </div>
                        </>
                }
            </form>
        </div>
    );
};

export default ProfileScreen;