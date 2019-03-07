import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
// import validate from "./validate";

import { Button, Form } from "reactstrap";
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
    const { handleSubmit, previousPage, cart } = this.props;

    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
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
                {cart.items.map((item, index) => (
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
            <Button
              type="button"
              className="btn btn-link text-muted bg-white"
              onClick={previousPage}
            >
              <FontAwesomeIcon icon="angle-left" />
              <span className="ml-2">Go back</span>
            </Button>
            <Button type="submit" className="btn btn-dark">
              <span className="mr-2">Choose payment method</span>
              <FontAwesomeIcon icon="angle-right" />
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

OrderReview = connect(mapStateToProps)(OrderReview);

export default reduxForm({
  form: "checkout",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(OrderReview);
