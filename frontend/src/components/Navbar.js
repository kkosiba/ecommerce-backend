import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const mapStateToProps = state => {
  return { cart: state.cart };
};

 class ConnectedNavbar extends Component {

  cartItemCount() {
    let result = 0;
    const { cart } = this.props;
    cart.map(item => result += item.quantity);
    return result;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-1">

          <Link to="/">
            <span className="navbar-brand font-weight-bold">
              <i class="fas fa-shoe-prints" /> Shoe Store
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link font-weight-bold">
                  Products
                </Link>
              </li>
              <li className="nav-item pl-2">
                <SearchForm />
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/cart" className="nav-link font-weight-bold">
                  <i className="fas fa-shopping-cart" /> Cart ({this.cartItemCount()})
                </Link>
              </li>
              <li className="nav-item pl-4">
                <div class="btn-group btn-group">
                  <Link to="/login" className="btn btn-warning">
                    Login <i class="fas fa-sign-out-alt" />
                  </Link>
                  <Link to="/register" className="btn btn-outline-secondary">
                    Register <i class="fas fa-user-plus" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const Navbar = connect(mapStateToProps)(ConnectedNavbar)

export default Navbar;
