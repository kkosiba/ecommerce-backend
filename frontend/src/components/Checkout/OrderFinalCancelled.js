import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return state.store;
};

class OrderFinalCancelled extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="font-weight-bold">Order cancelled</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrderFinalCancelled);
