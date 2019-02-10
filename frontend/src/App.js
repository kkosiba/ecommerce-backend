import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Default from "./components/Default";
import Footer from "./components/Footer";
import About from "./components/About";
import SearchResults from "./components/SearchResults";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import PrivateRoute from "./components/Authentication/PrivateRoute";

import Profile from "./components/Profiles/Profile";

import * as actions from "./store/actions";

import { MDBContainer } from "mdbreact";

const mapStateToProps = state => {
  return {
    cart: state.cart,
    products: state.products,
    token: state.token,
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: product => dispatch(actions.addProductToCart(product, 1)),
    removeProductFromCart: product =>
      dispatch(actions.removeProductFromCart(product)),
    updateProductQuantity: (product, qnt) =>
      dispatch(actions.updateProductQuantity(product, qnt)),
    incProductQuantity: item => dispatch(actions.incProductQuantity(item)),
    decProductQuantity: item => dispatch(actions.decProductQuantity(item)),
    emptyCart: () => dispatch(actions.emptyCart()),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <div className="content">
          <Navbar {...this.props} />

          <MDBContainer className="content py-4 grey lighten-4">
            <Switch>
              <Route
                exact
                path="/"
                render={props => <ProductList {...this.props} {...props} />}
              />

              <Route
                exact
                path="/login"
                render={props => <Login {...this.props} {...props} />}
              />

              <Route
                exact
                path="/register"
                render={props => <Register {...this.props} {...props} />}
              />

              <PrivateRoute path="/profile" component={Profile} />

              <Route path="/product/:slug" component={ProductDetails} />

              <Route
                path="/search/:query"
                render={props => <SearchResults {...props} />}
              />

              <Route
                path="/cart"
                render={props => <Cart {...this.props} {...props} />}
              />

              <PrivateRoute
                path="/checkout"
                cart={this.props.cart}
                component={Checkout}
              />

              <Route path="/about" component={About} />
              <Route component={Default} />
            </Switch>
          </MDBContainer>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
