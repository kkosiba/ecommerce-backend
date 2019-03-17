import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return state.store;
};

class OrderFinalFailure extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="font-weight-bold">
          Your order was not completed due to an error.
        </h1>
        <h3>Please try again.</h3>
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrderFinalFailure);
