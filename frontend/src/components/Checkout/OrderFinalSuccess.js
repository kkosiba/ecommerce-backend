import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setPayment,
  toggleCheckoutComplete,
  emptyCart
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

const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return undefined;
  }
};

class OrderFinalSuccess extends Component {
  constructor(props) {
    super(props);
    // saveCart(this.props.cart); // save cart to localStorage to display summary
    // this.props.placeOrder(values) // place order (performs the API call)
    // this.props.updateStock(this.props.cart); // deduct cart quantity from stock quantity (performs the API call)
    // this.props.emptyCart();
    this.props.resetCheckoutForm();
  }

  componentWillUnmount() {
    localStorage.removeItem("cart");
  }

  render() {
    const cart = loadCart();
    return (
      <React.Fragment>
        <h1>Order successful page</h1>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderFinalSuccess);
