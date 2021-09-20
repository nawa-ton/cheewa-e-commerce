import React, {useEffect} from 'react';
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import heroImage from "../hero-image.jpg";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="home-screen">
            <div className="hero-container">
                <img className="cover" src={heroImage}/>
            </div>
            <h1 className="text-center page-title">Our Products</h1>
            {loading ?
                <LoadingBox/> :
                error ?
                    <MessageBox variant="danger">{error}</MessageBox> :
                    <div className="row">
                        {
                            products.map(product => (
                                <Product key={product._id} product={product}/>
                            ))
                        }
                    </div>
            }
        </div>
    );
};

export default HomeScreen;