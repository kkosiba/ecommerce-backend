import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import validate from "../Utilities/validate";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { Form, Label, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    setShipping: value => dispatch(actions.setShipping(value))
  };
};

// const renderError = ({ meta: { touched, error } }) =>
//   touched && error ? <span>{error}</span> : false;

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "standard" // default delivery option
    };
  }

  componentDidMount() {
    if (this.props.cartSubtotal >= 100) {
      this.setState({ option: "free" });
    }
  }

  handleOptionChange = async e => {
    await this.setState({ option: e.target.value });
    switch (this.state.option) {
      case "free":
      case "collection":
        this.props.setShipping(0);
        break;
      case "express":
        this.props.setShipping(10.0);
        break;
      default:
        this.props.setShipping(5.0);
    }
  };

  render() {
    const { handleSubmit, previousPage, cart } = this.props;

    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-wrap mt-4 radios">
            <div className="deliverySelection">
              <Field
                id="free"
                type="radio"
                name="shipping"
                value="free"
                component="input"
                disabled={cart.subtotal < 100}
                checked={this.state.option === "free" && cart.subtotal >= 100}
                onChange={this.handleOptionChange}
              />
              <Label className="radio" htmlFor="free">
                <strong className="d-block text-uppercase mb-2">
                  Free standard delivery
                </strong>
                <span className="text-muted text-sm">
                  {cart.subtotal < 100
                    ? `This option will activate once you add items worth £${parseFloat(
                        100 - cart.subtotal
                      ).toFixed(2)} or more.`
                    : "You are eligible for FREE delivery!"}
                </span>
                <br />
                <span className="text-muted text-sm">
                  Approximately 3-5 working days.
                </span>
              </Label>
            </div>

            <div className="deliverySelection">
              <Field
                id="standard"
                type="radio"
                name="shipping"
                value="standard"
                component="input"
                checked={this.state.option === "standard"}
                onChange={this.handleOptionChange}
              />
              <Label className="radio" htmlFor="standard">
                <strong className="d-block text-uppercase mb-2">
                  Standard delivery - £5
                </strong>
                <span className="text-muted text-sm">
                  Approximately 3-5 working days.
                </span>
              </Label>
            </div>
            <div className="deliverySelection">
              <Field
                id="express"
                type="radio"
                name="shipping"
                value="express"
                component="input"
                checked={this.state.option === "express"}
                onChange={this.handleOptionChange}
              />
              <Label className="radio" htmlFor="express">
                <strong className="d-block text-uppercase mb-2">
                  Express delivery - £10
                </strong>
                <span className="text-muted text-sm">
                  Fastest option. Delivered within one working day.
                </span>
              </Label>
            </div>

            <div className="deliverySelection">
              <Field
                id="collection"
                type="radio"
                name="shipping"
                value="collection"
                component="input"
                checked={this.state.option === "collection"}
                onChange={this.handleOptionChange}
              />
              <Label className="radio" htmlFor="collection">
                <strong className="d-block text-uppercase mb-2">
                  Collection
                </strong>
                <span className="text-muted text-sm">
                  Collect your order in person.
                </span>
              </Label>
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
              <span className="mr-2">Review order</span>
              <FontAwesomeIcon icon="angle-right" />
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

Delivery = connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);

export default reduxForm({
  form: "checkout",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // unregister fields on unmount
  validate
})(Delivery);
