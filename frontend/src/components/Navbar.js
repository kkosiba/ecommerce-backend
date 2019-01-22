import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
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
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <div className="input-group-append">
                  <Link to="/search">
                    <button className="btn btn-outline-secondary" type="button">
                      <i class="fas fa-search" />
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/cart" className="nav-link font-weight-bold">
                <i className="fas fa-shopping-cart" /> Cart
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
      </nav>
    );
  }
}
