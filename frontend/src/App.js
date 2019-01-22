import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <div className="content">
        <Navbar />
        <main className="container content py-4 bg-light">
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/product/:slug" component={ProductDetails} />
            <Route path="/cart" component={Cart} />
            <Route path="/about" component={About} />
            <Route component={Default} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
