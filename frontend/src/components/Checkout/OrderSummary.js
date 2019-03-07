import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { formValueSelector } from "redux-form";

// const selector = formValueSelector("checkout");

const mapStateToProps = state => {
  return {
    cartItems: state.store.cart.items,
    cartSubtotal: state.store.cart.subtotal,
    shipping: state.store.shipping,
    // shippingFromCheckoutForm: selector(state, "checkout") ? selector(state, "checkout") : null
  };
};

class OrderSummary extends Component {
  render() {
    const { subtotal, afterTax, totalPrice, shipping, cart } = this.props;

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
              {shipping > 0 ? (
                `£${parseFloat(shipping).toFixed(2)}`
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
              £{parseFloat(totalPrice).toFixed(2)}
            </span>
          </div>

          <div
            className={`d-flex justify-content-${
              cart ? "between" : "center"
            } flex-column flex-lg-row`}
          >
            <Link to="/" className="btn btn-sm btn-default">
              <FontAwesomeIcon icon="angle-left" /> Continue shopping
            </Link>
            {cart ? (
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

export default connect(mapStateToProps)(OrderSummary);
