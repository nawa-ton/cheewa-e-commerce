import express from "express";
import data from "../data/initial.js";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productRouter = express.Router();

//generate initial product data
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await Product.remove();
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));

//get all products
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else {
        res.status(404).send({message: 'Product not found'});
    }
}));

export default productRouter;