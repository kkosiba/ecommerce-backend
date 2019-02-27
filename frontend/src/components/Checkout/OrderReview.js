import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import CheckoutNavbar from "./CheckoutNavbar";
import OrderSummary from "./OrderSummary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import PayPal from "./PayPal";

const mapStateToProps = state => {
  return {
    cartItems: state.store.cart.items,
    cartSubtotal: state.store.cart.subtotal,
    tax: state.store.tax,
    shipping: state.store.shipping
  };
};

class OrderReview extends Component {
  render() {
    const cart = this.props.cartItems;

    const subtotal = this.props.cartSubtotal;
    const shipping = this.props.shipping;
    const tax = this.props.tax;

    const afterTax = tax * subtotal;
    const totalPrice = subtotal + afterTax + shipping;

    return cart.length === 0 ? (
      <React.Fragment>
        <h3 className="text-center mt-2">
          Add some products to the cart first, then come back here :)
        </h3>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h3 className="mb-4">Checkout</h3>

        <div className="row">
          <div className="col-lg-8">
            <CheckoutNavbar active={4} />
            <div className="cart">
              <div className="cart-wrapper">
                <div className="cart-header text-uppercase text-center font-weight-bold">
                  <div className="row">
                    <div className="col-5">Item</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Quantity</div>
                    <div className="col-2">Total</div>
                  </div>
                </div>
                <div className="cart-body">
                  {cart.map((item, index) => (
                    <div className="p-4 border-top" key={item.id}>
                      <div className="row d-flex align-items-center text-center">
                        <div className="col-5">
                          <div className="d-flex align-items-center">
                            <img
                              className="product-image"
                              alt={item.name}
                              src={item.picture}
                            />
                            <span className="cart-title">{item.name}</span>
                          </div>
                        </div>
                        <div className="col-2">£{item.price}</div>
                        <div className="ml-2 col-2">{item.quantity}</div>
                        <div className="ml-1 col-2 text-center">
                          £{parseFloat(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-4 d-flex justify-content-between flex-column flex-lg-row">
              <Link to="/checkout/step3" className="btn btn-link text-muted">
                <FontAwesomeIcon icon="angle-left" />
                <span className="ml-2">Go back</span>
              </Link>
              <Link className="btn btn-dark" to="/checkout/final">
                <span className="mr-2">Finalize order</span>
                <FontAwesomeIcon icon="angle-right" />
              </Link>
              {/* <PayPal total={this.props.totalPrice} /> */}
            </div>
          </div>
          <div className="col-lg-4">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              afterTax={afterTax}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(OrderReview);
