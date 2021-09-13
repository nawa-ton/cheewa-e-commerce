import React from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {useSelector} from "react-redux";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
              <Link to="/signin">Sign in</Link>
            </div>
          </header>

          <main>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/cart/:id?" component={CartScreen}/> {/* Adding ? for optional*/}
          </main>

          <footer className="row center">
            All right reserve
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
