import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { Link } from "react-router-dom";

import CheckoutNavbar from "./CheckoutNavbar";
import OrderSummary from "./OrderSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Form, FormGroup, Label, /* Collapse,*/ Input } from "reactstrap";
import { Accordion } from "../Utilities/Accordion";

// for input formatting
// import Cleave from "cleave.js/react";

// import { Button } from "reactstrap";

const mapStateToProps = state => {
  return {
    cartItems: state.store.cart.items,
    cartSubtotal: state.store.cart.subtotal,
    tax: state.store.tax,
    shipping: state.store.shipping
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleStage: stage => dispatch(actions.toggleStage(stage))
  };
};

class Payment extends Component {

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
            <CheckoutNavbar active={3} />

            <Accordion open={0}>
              <Accordion.Item>
                <Accordion.Header>Pay by card</Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <FormGroup className="col-md-6">
                      <Label>Name on card</Label>
                      <Input
                        type="text"
                        placeholder="Name on card"
                        // onChange={e =>
                        //   this.setState({
                        //     invoiceAddress: { fullName: e.target.value }
                        //   })
                        // }
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Card number</Label>
                      <Input
                        type="text"
                        placeholder="Card number"
                        // onChange={e =>
                        //   this.setState({
                        //     invoiceAddress: { fullName: e.target.value }
                        //   })
                        // }
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Expiry date</Label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        // onChange={e =>
                        //   this.setState({
                        //     invoiceAddress: { fullName: e.target.value }
                        //   })
                        // }
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>CVC/CVV</Label>
                      <Input
                        type="text"
                        placeholder="000"
                        // onChange={e =>
                        //   this.setState({
                        //     invoiceAddress: { fullName: e.target.value }
                        //   })
                        // }
                      />
                    </FormGroup>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>PayPal</Accordion.Header>
                <Accordion.Body>
                  <div className="ml-4">
                    <Label>
                      <Input
                        type="radio"
                        name="paypal"
                        // onChange={e =>
                        //   this.setState({
                          //     invoiceAddress: { fullName: e.target.value }
                          //   })
                          // }
                      />
                      Choose PayPal
                    </Label>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="my-4 d-flex justify-content-between flex-column flex-lg-row">
              <Link to="/checkout/step2" className="btn btn-link text-muted">
                <FontAwesomeIcon icon="angle-left" />
                <span className="ml-2">Go back</span>
              </Link>
              <Link className="btn btn-dark" to="/checkout/step4">
                <span className="mr-2">Review your order</span>
                <FontAwesomeIcon icon="angle-right" />
              </Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
