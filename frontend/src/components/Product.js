import React from 'react';
import Ratings from "./Ratings";

const Product = (props) => {
    const {product} = props;
    return (
        <div key={product._id} className="card">
            <a href={`/product/${product._id}`}>
                <img alt={product.name} className="medium" src={product.image}/>
            </a>
            <div className="card-body">
                <a href={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </a>
               <Ratings rating={product.rating} numReviews={product.numReviews}/>
                <div className="price">${product.price}</div>
            </div>
        </div>
    );
};

export default Product;