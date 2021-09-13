import express from 'express';
import mongoose from 'mongoose';
import data from "./data/initial.js";
import userRouter from "./router/userRouter.js"; //must have .js

const app = express();

const uri = process.env.MONGODB_URL || 'mongodb://localhost/cheewa';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(item => item._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});



app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/users', userRouter);

//This will redirect all errors from what are wrapped inside expressAsyncHandler to frontend
app.use((error, req, res, next) => {
    res.status(500).send({message: error.message});
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});