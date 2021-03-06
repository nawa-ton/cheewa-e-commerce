import React, {useEffect, useState} from 'react';
import Ratings from "../components/Ratings";
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsProduct} from "../actions/productActions";

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div className="product-screen">
            {loading ?
                <LoadingBox/> :
                error ?
                    <MessageBox variant="danger">{error}</MessageBox> :
                    <div>
                        <div className="row top">
                            <div className="col-1 col-right-margin">
                                <img className="cover" src={product.image} alt={product.name}/>
                            </div>
                            <div className="col-1 col-right-margin">
                                <ul>
                                    <li>
                                        <h1>{product.name}</h1>
                                    </li>
                                    <li>
                                        <Ratings rating={product.rating} numReviews={product.numReviews}/>
                                    </li>
                                    <li>
                                        {product.description}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">${product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div className="price">
                                                    {product.countInStock > 0 ?
                                                        <span className="success" >In Stock</span> :
                                                        <span className="danger" >Out of Stock</span>}
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            product.countInStock > 0 ?
                                                <li>
                                                    <div className="row">
                                                        <div>Quantity</div>
                                                        <div>
                                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                        <option key={x + 1}
                                                                                value={x + 1}>{x + 1}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li> :
                                                <></>
                                        }
                                        {
                                            product.countInStock > 0 ?
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                </li> :
                                                <></>
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ProductScreen;