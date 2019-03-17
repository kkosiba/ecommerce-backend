import React, { Component } from "react";
import { connect } from "react-redux";
import OrderFinalSuccess from "./OrderFinalSuccess";
import OrderFinalCancelled from "./OrderFinalCancelled";
import OrderFinalFailure from "./OrderFinalFailure";

const mapStateToProps = state => {
  return state.store;
};

class OrderFinal extends Component {
  render() {
    const { paymentStatus } = this.props;

    switch(paymentStatus) {
      case "success":
        return <OrderFinalSuccess />;
      case "cancelled":
        return <OrderFinalCancelled />;
      default:
        return <OrderFinalFailure />;
    }
  }
}

export default connect(mapStateToProps)(OrderFinal);
