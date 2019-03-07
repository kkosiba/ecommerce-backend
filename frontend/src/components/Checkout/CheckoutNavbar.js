import React, { Component } from "react";

class CheckoutNavbar extends Component {
  markActive = (page, name) => {
    const { active } = this.props;

    return (
      <div
        className={`d-flex align-items-center justify-content-center p-2 ${
          active === page ? "bg-dark text-white" : "bg-light text-dark"
        } w-25`}
      >
        {name}
      </div>
    );
  };

  render() {
    return (
      <div className="d-flex text-center mb-4 font-weight-bold">
        {this.markActive(1, "Address")}
        {this.markActive(2, "Delivery")}
        {this.markActive(3, "Review Order")}
        {this.markActive(4, "Payment")}
      </div>
    );
  }
}

export default CheckoutNavbar;
