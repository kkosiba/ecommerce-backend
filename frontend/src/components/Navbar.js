import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import SearchForm from "./Products/SearchForm";
import jwt_decode from "jwt-decode"; // for decoding JWT tokens

import {
  Navbar as NavBar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  Container
} from "reactstrap";

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    cartItems: state.store.cart.items
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
    this.props.cartItems.map(item => (result += item.quantity));
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
          <i className="fas fa-truck" />{" "}
          <em>Free delivery on orders over £100!</em>
        </div>
        <NavBar color="dark" dark expand="lg">
          <Container className="py-1">
            <NavbarBrand
              tag={Link}
              to={"/"}
              className="mr-4 text-light font-weight-bold"
            >
              eCommerce
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <SearchForm />
              <Nav className="ml-auto align-items-center">
                <NavItem>
                  <Link to="/cart" className="text-light mr-3">
                    <i className="fas fa-shopping-cart" />
                    <span className="font-weight-bold"> Cart</span> (
                    {this.cartItemCount()})
                  </Link>
                </NavItem>

                <NavItem>
                  {this.props.isAuthenticated ? (
                    <div className="btn-group">
                      <Link to="/profile" className="btn btn-sm btn-success">
                        {decoded_token.username !== "" // if user has username...
                          ? decoded_token.username // display it or use email
                          : decoded_token.email}{" "}
                        <i className="fas fa-user" />
                      </Link>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={this.props.logout}
                      >
                        Logout <i className="fas fa-sign-out-alt" />
                      </button>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <Link to="/login" className="btn btn-sm btn-warning">
                        Login <i className="fas fa-sign-in-alt" />
                      </Link>
                      <Link to="/register" className="btn btn-sm btn-info">
                        Register <i className="fas fa-user-plus" />
                      </Link>
                    </div>
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

export default connect(mapStateToProps)(Navbar);
