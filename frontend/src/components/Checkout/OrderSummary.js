import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = state => {
  return state.store;
};

const mapShippingStringToNumeric = value => {
  switch (value) {
    case "free":
    case "collection":
      return 0.0;
    case "express":
      return 10.0;
    default:
      return 5.0;
  }
};

class OrderSummary extends Component {
  render() {
    const { subtotal, tax, shipping, isCartComponent } = this.props;
    const shippingNumeric = mapShippingStringToNumeric(shipping);
    const afterTax = tax * subtotal;
    const total = subtotal + afterTax + shippingNumeric;

    return (
      <React.Fragment>
        <div className="bg-light p-4">
          <h6 className="text-uppercase font-weight-bold px-2">
            Order Summary
          </h6>
          <hr />
          <div className="d-flex px-2 my-4">
            <span>Order Subtotal</span>
            <span className="ml-auto">£{parseFloat(subtotal).toFixed(2)}</span>
          </div>
          <hr />
          <div className="d-flex px-2 my-4">
            <span>Shipping</span>
            <span className="ml-auto">
              {shippingNumeric > 0 ? (
                `£${parseFloat(shippingNumeric).toFixed(2)}`
              ) : (
                <strong>FREE</strong>
              )}
            </span>
          </div>
          <hr />
          <div className="d-flex px-2 my-4">
            <span>Tax (20%)</span>
            <span className="ml-auto">£{parseFloat(afterTax).toFixed(2)}</span>
          </div>
          <hr />
          <div className="d-flex px-2 my-4">
            <span>Total</span>
            <span className="ml-auto font-weight-bold">
              £{parseFloat(total).toFixed(2)}
            </span>
          </div>

          <div
            className={`d-flex justify-content-${
              isCartComponent ? "between" : "center"
            } flex-column flex-lg-row`}
          >
            <Link to="/" className="btn btn-sm btn-default">
              <FontAwesomeIcon icon="angle-left" /> Continue shopping
            </Link>
            {isCartComponent ? (
              <Link to="/checkout" className="btn btn-sm btn-dark">
                Checkout <FontAwesomeIcon icon="angle-right" />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

OrderSummary.propTypes = {
  isCartComponent: PropTypes.bool,
  shipping: PropTypes.string.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(OrderSummary);
