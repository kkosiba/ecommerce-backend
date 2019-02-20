import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Address from "./components/Checkout/Address";
import Delivery from "./components/Checkout/Delivery";
import Payment from "./components/Checkout/Payment";
import OrderReview from "./components/Checkout/OrderReview";
// import OrderSuccess from "./components/Checkout/OrderSuccess";

import Footer from "./components/Footer";
import About from "./components/About";
import SearchResults from "./components/SearchResults";
import Default from "./components/Default";

// scroll page back to top once component updates
import ScrollToTop from "./components/Utilities/ScrollToTop";
// private route (requires authentication)
import PrivateRoute from "./components/Utilities/PrivateRoute";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Profile from "./components/Profiles/Profile";

import * as actions from "./store/actions";
import * as auth from "./store/actions/auth";

import { Container } from "reactstrap";

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    products: state.store.products,

    cartItems: state.store.cart.items,
    cartSubtotal: state.store.cart.subtotal,

    checkout: state.store.checkout
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
    calculateCart: () => dispatch(actions.calculateCart()),
    onTryAutoSignup: () => dispatch(auth.authCheckState()),
    logout: () => dispatch(auth.logout())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Navbar {...this.props} />

          <Container className="content my-4">
            <Switch>
              <Route
                exact
                path="/"
                render={props => <ProductList {...this.props} {...props} />}
              />

              <Route exact path="/login" component={Login} />

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

              <Route path="/cart" component={Cart} />

              <PrivateRoute path="/checkout/step1" component={Address} />

              <PrivateRoute path="/checkout/step2" component={Delivery} />

              <PrivateRoute path="/checkout/step3" component={Payment} />

              <PrivateRoute path="/checkout/step4" component={OrderReview} />

              <Route path="/about" component={About} />
              <Route component={Default} />
            </Switch>
          </Container>

          <Footer />
        </ScrollToTop>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
