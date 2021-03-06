import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
//parsing json as request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'https://cheewa.netlify.app'
}));
/*const uri = process.env.MONGODB_URL || 'mongodb://localhost/cheewa';*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log("Successfully connected to MongoDB database");
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

//This will redirect all errors from what are wrapped inside expressAsyncHandler to frontend
app.use((error, req, res, next) => {
    res.status(500).send({message: error.message});
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});