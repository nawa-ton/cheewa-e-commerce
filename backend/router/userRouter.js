import express from "express";
import data from "../data/initial.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import {generateToken} from "../utils.js";

const userRouter = express.Router();

//generate initial user data
//use expressAsyncHandler for displaying error to user
userRouter.get('/seed', expressAsyncHandler (async (req, res) => {
   //await User.remove();
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    let message = "Invalid user email";
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                }
            );
            return;
        }
        message = "Invalid password";
    }
    res.status(401).send({message: message});
}))

export default userRouter;