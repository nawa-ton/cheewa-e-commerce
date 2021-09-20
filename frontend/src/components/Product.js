import React from 'react';
import Ratings from "./Ratings";
import {Link} from "react-router-dom";

const Product = (props) => {
    const {product} = props;
    return (
        <div key={product._id} className="card col-4">
            <Link to={`/product/${product._id}`}>
                <img alt={product.name} className="full-width" src={product.image}/>
                <div className="card-body">
                    <div className="product-caption">{product.name}<br/>
                       ${product.price}
                    </div>
                    {/*<Ratings rating={product.rating} numReviews={product.numReviews}/>*/}
                </div>
            </Link>
        </div>
    );
};

export default Product;