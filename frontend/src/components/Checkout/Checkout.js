import React, { Component } from "react";
// import { withLastLocation } from 'react-router-last-location';
// import { Redirect } from "react-router-dom";
// import axios from "axios";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Address from "./Address";
import Delivery from "./Delivery";
import Payment from "./Payment";
import OrderReview from "./OrderReview";
import OrderSuccess from "./OrderSuccess";

import CheckoutNavbar from "./CheckoutNavbar";
import OrderSummary from "./OrderSummary";

import { formValueSelector } from "redux-form";

const selector = formValueSelector("checkout");

const mapStateToProps = state => {
  return {
    cartItems: state.store.cart.items,
    cartSubtotal: state.store.cart.subtotal,
    tax: state.store.tax,
    shipping: state.store.shipping,
    checkoutComplete: state.store.checkoutComplete,
    firstName: selector(state, "firstName")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: () => dispatch(actions.emptyCart()),
    toggleCheckout: () => dispatch(actions.toggleCheckout())
  };
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
      page: 1,
      isComplete: false
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handlePayment() {
    this.props.toggleCheckout(); // once payment goes through, mark checkout as complete
    this.setState({ isComplete: this.props.checkoutComplete });
  }

  render() {
    const cart = {
      // contains all relevant information from the cart
      items: this.props.cartItems,
      subtotal: this.props.cartSubtotal,
      shipping: this.props.shipping,
      tax: this.props.tax,
      afterTax: this.props.tax * this.props.cartSubtotal,
      totalPrice:
        (1.0 + this.props.tax) * this.props.cartSubtotal + this.props.shipping
    };

    // const { onSubmit } = this.props;
    const { page, isComplete } = this.state;

    if (isComplete) {
      return <OrderSuccess cart={cart} />;
    } else if (cart.items.length === 0) {
      return (
        <React.Fragment>
          <h3 className="text-center mt-2">
            Add some products to the cart first, then come back here :)
          </h3>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3 className="mb-4">Checkout</h3>
          <div className="row">
            <div className="col-lg-8">
              {page === 1 && (
                <div>
                  <CheckoutNavbar active={1} />
                  <Address onSubmit={this.nextPage} />
                </div>
              )}
              {page === 2 && (
                <div>
                  <CheckoutNavbar active={2} />
                  <Delivery
                    cart={cart}
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />
                </div>
              )}
              {page === 3 && (
                <div>
                  <CheckoutNavbar active={3} />
                  <OrderReview
                    cart={cart}
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />
                </div>
              )}
              {page === 4 && (
                <div>
                  <CheckoutNavbar active={4} />
                  <Payment
                    previousPage={this.previousPage}
                    onSubmit={this.handlePayment}
                  />
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <OrderSummary
                subtotal={cart.subtotal}
                shipping={cart.shipping}
                afterTax={cart.afterTax}
                totalPrice={cart.totalPrice}
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
