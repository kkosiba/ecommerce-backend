import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import PrivateRoute from "../Utilities/PrivateRoute";

import Address from "./Address";

import Delivery from "./Delivery";
import Payment from "./Payment";


import OrderReview from "./OrderReview";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: 0.2,
      shipping: 5
    };
  }

    singleItemTotal = item => {
    const res = item.price * item.quantity;
    return res.toFixed(2);
  };

  calculate = () => {
    // returns an object with attributes subtotal, afterTax and totalPrice
    const { cart } = this.props;
    let subtotal = 0.0;
    cart.map(item => (subtotal += item.price * item.quantity));
    const afterTax = this.state.tax * subtotal;
    const totalPrice = subtotal + afterTax + this.state.shipping;
    return {
      subtotal: subtotal.toFixed(2),
      afterTax: afterTax.toFixed(2),
      totalPrice: totalPrice.toFixed(2)
    };
  };

  render() {
    const { cart } = this.props;

    return cart.length === 0 ? (
      <React.Fragment>
        <h3 className="text-center mt-2">
          Add some products to the cart first, then come back here :)
        </h3>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h3 className="mb-4">Checkout</h3>

        <PrivateRoute path="/checkout/address" cart={cart} component={Address} />
        <PrivateRoute path="/checkout/delivery" component={Delivery} />
        <PrivateRoute path="/checkout/payment" component={Payment} />
        <PrivateRoute path="/checkout/review" cart={cart} component={OrderReview} />

      </React.Fragment>
    );
  }
}

export default Checkout;
