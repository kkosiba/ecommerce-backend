import React, { Component } from "react";
import PropTypes from "prop-types";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { connect } from "react-redux";
import {
  setPayment,
  emptyCart,
  toggleCheckoutComplete
} from "../../store/actions/storeActions";
import { reset } from "redux-form";


const mapStateToProps = state => {
  return state.store;
};

const mapDispatchToProps = dispatch => {
  return {
    setPayment: value => dispatch(setPayment(value)),
    // placeOrder: values => dispatch(placeOrder(values)), // NOT YET IMPLEMENTED
    // updateStock: data => dispatch(updateStock(data)), // NOT YET IMPLEMENTED
    emptyCart: () => dispatch(emptyCart()),
    toggleCheckoutComplete: () => dispatch(toggleCheckoutComplete()),
    resetCheckoutForm: () => dispatch(reset("checkout"))
  };
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

class PayPal extends Component {
  render() {
    const onSuccess = (details, data) => {
      // Congratulation, it came here means everything's fine!
      // console.log("The payment was succeeded!", payment);
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data

      this.props.toggleCheckoutComplete();
      // this.props.placeOrder(values); // post order data to API
      // this.props.updateStock(this.props.cart); // remove purchased products from stock
      this.props.emptyCart();
      this.props.resetCheckoutForm();
      this.props.setPayment("success");
    };

    const onCancel = data => {
      // User pressed "cancel" or close Paypal's popup!
      // console.log("The payment was cancelled!", data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
      this.props.toggleCheckoutComplete();
      this.props.resetCheckoutForm();
      this.props.setPayment("cancelled");
    };

    const onError = err => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      // console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
      this.props.toggleCheckoutComplete();
      this.props.setPayment("error");
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "GBP"; // or you can set this value from your props or state
    // let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const { subtotal, tax, shipping } = this.props;
    const shippingNumeric = mapShippingStringToNumeric(shipping);
    const afterTax = tax * subtotal;
    const total = subtotal + afterTax + shippingNumeric;

    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_SANDBOX_ID,
      production: "YOUR-PRODUCTION-APP-ID"
    };
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        total={total}
        currency={currency}
        onSuccess={onSuccess}
        onCancel={onCancel}
        onError={onError}
      />
    );
  }
}

PayPal.propTypes = {
  shipping: PropTypes.string.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  toggleCheckoutComplete: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  resetCheckoutForm: PropTypes.func.isRequired,
  setPayment: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayPal);
