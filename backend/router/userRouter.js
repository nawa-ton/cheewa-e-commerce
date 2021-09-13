import express from "express";
import data from "../data/initial.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

//insert users to user table
//use expressAsyncHandler for displaying error to user
userRouter.get('/seed', expressAsyncHandler (async (req, res) => {
   //await User.remove();
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

export default userRouter;