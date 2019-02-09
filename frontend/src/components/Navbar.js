import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import jwt_decode from "jwt-decode"; // for decoding JWT tokens

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";

class Navbar extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  cartItemCount() {
    let result = 0;
    const { cart } = this.props;
    cart.map(item => (result += item.quantity));
    return result;
  }

  render() {
    let decoded_token = undefined;
    if (this.props.token) {
      decoded_token = jwt_decode(this.props.token);
    }

    return (
      <MDBNavbar color="black" dark expand="md">
        <div className="container">
          <MDBNavbarBrand>
            <strong className="white-text">
              <Link to="/">CloverPlants</Link>
            </strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <SearchForm />
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem className="mr-2 pt-1">
                <MDBNavLink to="/cart">
                  <i className="fas fa-shopping-cart" />
                  <strong>Cart</strong> ({this.cartItemCount()})
                </MDBNavLink>
              </MDBNavItem>

              <MDBNavItem>
                {this.props.isAuthenticated ? (
                  <div class="btn-group btn-group">
                    <Link to="/profile" className="btn btn-success">
                      {decoded_token.username} <i class="fas fa-user" />
                    </Link>
                    <button
                      className="btn btn-warning"
                      onClick={this.props.logout}
                    >
                      Logout <i class="fas fa-sign-out-alt" />
                    </button>
                  </div>
                ) : (
                  <div class="btn-group btn-group">
                    <Link to="/login" className="btn btn-warning">
                      Login <i class="fas fa-sign-in-alt" />
                    </Link>
                    <Link to="/register" className="btn btn-info">
                      Register <i class="fas fa-user-plus" />
                    </Link>
                  </div>
                )}
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </div>
      </MDBNavbar>
    );
  }
}

export default Navbar;
