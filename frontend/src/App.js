import React from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {useDispatch, useSelector} from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import {signout} from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();

  const signouthandler = () => {
    dispatch(signout());
  }

  return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="logo" to="/">Cheewa</Link>
            </div>
            <div>
              <Link to="/cart">Cart
              {cartItems.length > 0 ?
                  <span className="badge">{cartItems.length}</span> :
                  <></>
              }
              </Link>
              {userInfo ?
                  <div className="dropdown">
                    <Link to="#">{userInfo.name}<i className="fa fa-caret-down"/> </Link>
                    <ul className="dropdown-content">
                      <li><Link to="/profile">User Profile</Link></li>
                      <li><Link to="/orderhistory">Order History</Link></li>
                      <li><Link to="#signout" onClick={signouthandler}>Sign Out</Link></li>
                    </ul>
                  </div>:
                  <Link to="/signin">Sign in</Link>
              }
              {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">Admin <i className="fa fa-caret-down"/></Link>
                    <ul className="dropdown-content">
                      <li><Link to="/dashboard">Dashboard</Link></li>
                      <li><Link to="/productlist">Products</Link></li>
                      <li><Link to="/orderlist">Orders</Link></li>
                      <li><Link to="/userlist">Users</Link></li>
                    </ul>
                  </div>
              )}
            </div>
          </header>

          <main>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/cart/:id?" component={CartScreen}/> {/* Adding ? to make id optional */}
            <Route path="/signin" component={SigninScreen}/>
            <Route path="/register" component={RegisterScreen}/>
            <PrivateRoute path="/profile" component={ProfileScreen}/>
            <Route path="/shipping" component={ShippingScreen}/>
            <Route path="/payment" component={PaymentScreen}/>
            <Route path="/placeorder" component={PlaceOrderScreen}/>
            <Route path="/order/:id" component={OrderDetailsScreen}/>
            <Route path="/orderhistory" component={OrderHistoryScreen}/>
          </main>

          <footer className="row center">
            All right reserve
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
