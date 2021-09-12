import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";

function App() {
  return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <a href="/">Cheewa</a>
            </div>
            <div>
              <a href="/cart">Cart</a>
              <a href="/signin">Sign in</a>
            </div>
          </header>

          <main>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/product/:id" component={ProductScreen}/>

          </main>

          <footer className="row center">
            All right reserve
          </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
