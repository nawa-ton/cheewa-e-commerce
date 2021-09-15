import React from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {useDispatch, useSelector} from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import {signout} from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";

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
                      <Link to="#signout" onClick={signouthandler}>Sign Out</Link>
                    </ul>
                  </div>:
                  <Link to="/signin">Sign in</Link>
              }

            </div>
          </header>

          <main>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/cart/:id?" component={CartScreen}/> {/* Adding ? to make id optional */}
            <Route path="/signin" component={SigninScreen}/>
            <Route path="/register" component={RegisterScreen}/>
          </main>

          <footer className="row center">
            All right reserve
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
