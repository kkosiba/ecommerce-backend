import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import SearchForm from "./Products/SearchForm";
import jwt_decode from "jwt-decode"; // for decoding JWT tokens

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Navbar as NavBar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  Container,
  ButtonGroup,
  Button
} from "reactstrap";

import { authLogout } from "../store/actions/authActions";

const mapStateToProps = state => {
  return {
    cart: state.store.cart,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authLogout: () => dispatch(authLogout())
  };
};

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  cartItemCount = () => {
    let result = 0;
    this.props.cart.map(item => (result += item.quantity));
    return result;
  };

  render() {
    let decoded_token = undefined;
    if (this.props.token) {
      decoded_token = jwt_decode(this.props.token);
    }

    return (
      <React.Fragment>
        <div className="bg-light text-center text-dark py-1">
          <FontAwesomeIcon icon="truck" />{" "}
          <em>Free delivery on orders over £100!</em>
        </div>
        <NavBar color="dark" dark expand="md">
          <Container className="mx-auto">
            <NavbarBrand
              tag={Link}
              to={"/"}
              className="mr-4 text-light font-weight-bold"
            >
              eCommerce
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="rounded-0" />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="align-items-center justify-content-center">
                <NavItem>
                  <div id="searchBox">
                    <SearchForm />
                  </div>
                </NavItem>
              </Nav>
              <Nav className="ml-auto align-items-center justify-content-center">
                <NavItem>
                  <div id="cartCount">
                    <Link to="/cart" className="text-light">
                      <FontAwesomeIcon icon="shopping-cart" />
                      <span className="font-weight-bold"> Cart</span> (
                      {this.cartItemCount()})
                    </Link>
                  </div>
                </NavItem>
              </Nav>
              <Nav className="align-items-center justify-content-center">
                <NavItem>
                  {this.props.isAuthenticated ? (
                    <ButtonGroup id="authBtnGroup">
                      <Link to="/profile" className="btn btn-sm btn-success">
                        {decoded_token.username !== "" // if user has username...
                          ? decoded_token.username // display it or use email
                          : decoded_token.email}{" "}
                        <FontAwesomeIcon icon="user" />
                      </Link>
                      <Button
                        className="btn btn-sm btn-warning"
                        onClick={this.props.authLogout}
                      >
                        Logout <FontAwesomeIcon icon="sign-out-alt" />
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup>
                      <Link to="/login" className="btn btn-sm btn-warning">
                        Login <FontAwesomeIcon icon="sign-in-alt" />
                      </Link>
                      <Link to="/register" className="btn btn-sm btn-info">
                        Register <FontAwesomeIcon icon="user-plus" />
                      </Link>
                    </ButtonGroup>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </NavBar>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  cart: PropTypes.array,
  isAuthenticated: PropTypes.bool,
  authLogout: PropTypes.func,
  token: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
