import React, {useEffect} from 'react';
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    console.log("HomeScreen products: ", products);
    return (
        <div className="home-screen">
            <div className="hero-container">
                <div className="layer">
                    <p>Natural and healthy food that does not compromise on&nbsp;flavour</p>
                    <button className="primary" onClick={() => {
                        props.history.push(`/products`);
                    }}>Our Products</button>
                </div>
            </div>
            <h1 className="text-center page-title">Best Seller</h1>
            {loading ?
                <LoadingBox/> :
                error ?
                    <MessageBox variant="danger">{error}</MessageBox> :
                    <div className="row">
                        {
                            products.map(product =>
                                (product.numReviews >= 20 && product.rating > 4 ?
                                        <Product key={product._id} product={product}/> :
                                        <div key={product._id}/>
                                ))
                        }
                    </div>
            }
        </div>
    );
};

export default HomeScreen;