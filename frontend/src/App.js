import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
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
import OrderSuccess from "./components/Checkout/OrderSuccess";

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
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <LastLocationProvider>
          <ScrollToTop>
            <Navbar />
            <Container className="content my-4">
              <Switch>
                <Route exact path="/" component={ProductList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                {/* <PrivateRoute path="/profile" component={Profile} /> */}

                <Route path="/product/:slug" component={ProductDetails} />
                <Route path="/search/:query" component={SearchResults} />
                <Route path="/cart" component={Cart} />
                <PrivateRoute exact path="/checkout" component={Checkout} />
                <PrivateRoute exact path="/checkout/success" component={OrderSuccess} />
                <Route path="/about" component={About} />
                <Route component={Default} />
              </Switch>
            </Container>

            <Footer />
          </ScrollToTop>
        </LastLocationProvider>
      </Router>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
