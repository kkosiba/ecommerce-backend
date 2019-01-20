import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <Link to="/">
                    <span className="navbar-brand font-weight-bold">Ecommerce</span>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link font-weight-bold">
                                Products
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link font-weight-bold">
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Link>
                        </li>
                        <li className="nav-item pl-2">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search..." />
                            <div className="input-group-append">
                                <Link to="/search">
                                    <button className="btn btn-outline-secondary" type="button">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}