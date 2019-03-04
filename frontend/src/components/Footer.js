import React, { Component } from "react";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";

import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <Container className="grey lighten-4 text-center text-dark py-2">
          
        </Container>
        <div className="bg-light text-dark py-5">
          <Container className="py-3">
            <div className="d-flex flex-column flex-md-row flex-wrap">
              <div className="mr-5">
                <h5 className="font-weight-bold">Customer Service</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/order_tracking">Order Tracking</Link>
                  </li>
                  <li>
                    <Link to="/returns_and_exchanges">Returns and Exchanges</Link>
                  </li>
                  <li>
                    <Link to="/refunds">Refunds</Link>
                  </li>
                  <li>
                    <Link to="/delivery_and_collections">
                      Delivery & Collections
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-weight-bold">Information</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms of Use</Link>
                  </li>
                  <li>
                    <Link to="/careers">Careers</Link>
                  </li>
                </ul>
              </div>

              <div className="ml-auto">
                <Newsletter />
                <ul className="list-inline mt-4">
                  <li className="list-inline-item">
                    <Link to="/">
                      <FontAwesomeIcon
                        icon={["fab", "twitter"]}
                        size="2x"
                        className="pr-2"
                      />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <FontAwesomeIcon
                        icon={["fab", "facebook-f"]}
                        size="2x"
                        className="pr-2"
                      />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <FontAwesomeIcon
                        icon={["fab", "linkedin"]}
                        size="2x"
                        className="pr-2"
                      />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <FontAwesomeIcon
                        icon={["fab", "pinterest"]}
                        size="2x"
                        className="pr-2"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        <div className="bg-dark text-light">
          <Container className="py-4">
            <div className="d-flex align-items-center">
              <span>&copy; 2019 by eCommerce. All rights reserved. <Link to="#">Back to top</Link></span>
              <div className="ml-auto">
                <span className="mr-2"><FontAwesomeIcon icon={["fab", "cc-visa"]} size="2x" /></span>
                <span className="mr-2"><FontAwesomeIcon icon={["fab", "cc-mastercard"]} size="2x" /></span>
                <FontAwesomeIcon icon={["fab", "cc-paypal"]} size="2x" />
              </div>
            </div>
          </Container>
        </div>
      </footer>
    );
  }
}
