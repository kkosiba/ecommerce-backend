import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";

// custom history to enable users redirecting from outside of components
import { history } from "./history";

import { connect } from "react-redux";

import { authCheckState } from "./store/actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProductList from "./components/Products/ProductList";
import ProductDetails from "./components/Products/ProductDetails";
import SearchResults from "./components/Products/SearchResults";

import Cart from "./components/Checkout/Cart";
import Checkout from "./components/Checkout/Checkout";

import About from "./components/About";
import Default from "./components/Default";

// scroll page back to top once component updates
import ScrollToTop from "./components/Utilities/ScrollToTop";
// private route (requires authentication)
import PrivateRoute from "./components/Utilities/PrivateRoute";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
// import Profile from "./components/Profiles/Profile";

import { Container } from "reactstrap";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
  faPinterest,
  faCcVisa,
  faCcMastercard,
  faCcPaypal
} from "@fortawesome/free-brands-svg-icons";
import {
  faMinusSquare,
  faPlusSquare,
  faTimesCircle
} from "@fortawesome/free-regular-svg-icons";

import {
  faTruck,
  faShoppingCart,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faPaperPlane,
  faCartPlus,
  faTrashAlt,
  faListAlt,
  faSearch,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFacebookF,
  faTwitter,
  faLinkedin,
  faPinterest,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faTruck,
  faShoppingCart,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faPaperPlane,
  faCartPlus,
  faTrashAlt,
  faListAlt,
  faSearch,
  faMinusSquare,
  faPlusSquare,
  faTimesCircle,
  faAngleLeft,
  faAngleRight
);

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(authCheckState())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    return (
      <Router history={history}>
        <LastLocationProvider>
          <ScrollToTop>
            <Navbar />
            <Container className="content my-4">
              <Switch>
                <Route exact path="/" component={ProductList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                {/* <PrivateRoute path="/profile" component={Profile} /> */}

                <Route exact path="/product/:slug" component={ProductDetails} />
                <Route exact path="/search/:query" component={SearchResults} />
                <Route exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/checkout" component={Checkout} />
                <Route exact path="/about" component={About} />
                <Route exact component={Default} />
              </Switch>
            </Container>

            <Footer />
          </ScrollToTop>
        </LastLocationProvider>
      </Router>
    );
  }
}

App.propTypes = {
  onTryAutoSignup: PropTypes.func
}

export default connect(
  null,
  mapDispatchToProps
)(App);
