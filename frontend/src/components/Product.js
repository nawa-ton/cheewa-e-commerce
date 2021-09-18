import React from 'react';
import Ratings from "./Ratings";
import {Link} from "react-router-dom";

const Product = (props) => {
    const {product} = props;
    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img alt={product.name} className="medium" src={product.image}/>
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
               {/*<Ratings rating={product.rating} numReviews={product.numReviews}/>*/}
                <div className="price">${product.price}</div>
            </div>
        </div>
    );
};

export default Product;