import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white">
        <div className="container py-3">
          <div className="row">
            <div className="col-md-3">
              <h4>About Store</h4>
              <p>
                Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia
                reprehenderit. Eos cumque dicta adipisci architecto culpa amet.
              </p>
              <p>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fab fa-twitter pr-2" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fab fa-facebook-f pr-2" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fab fa-linkedin pr-2" />
                    </Link>
                    >
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fab fa-pinterest" />
                    </Link>
                  </li>
                </ul>
              </p>
            </div>
            <div className="col-md-3">
              <h4>Customer Support</h4>
              <p>
                <ul className="list-unstyled">
                  <li>
                    <a href="/">Contact</a>
                  </li>
                </ul>
              </p>
            </div>
            <div className="col-md-3">
              <h4>Information</h4>
              <p>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/about">About us</Link>
                  </li>
                </ul>
              </p>
            </div>

            <div className="col-md-3">
              <h4>Contact Information</h4>
              <ul className="list-unstyled">
                <li>
                  291 South 21th Street, <br /> Suite 721 New York NY 10016
                </li>
                <li>
                  <Link to="tel://1234567920">+ 1235 2355 98</Link>
                </li>
                <li>
                  <Link to="/">Email</Link>
                </li>
                <li>
                  <Link to="/">yoursite.com</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copy">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                <span className="block">
                  Copyright &copy; 2019 by Author. All rights reserved
                </span>
                <br />
                <span className="block">
                  Images by:{" "}
                  <Link to="http://unsplash.co/" target="_blank">
                    Unsplash
                  </Link>
                </span>
                <br />
                <span className="block">
                  <Link to="#">Back to top</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
