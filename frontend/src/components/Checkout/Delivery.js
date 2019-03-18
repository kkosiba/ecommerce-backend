import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { setShipping } from "../../store/actions/storeActions";
import { Form, Label, Button, Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = state => {
  return {
    subtotal: state.store.subtotal,
    // to initialize redux-form from redux store
    initialValues: {
      shipping: state.store.shipping
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShipping: value => dispatch(setShipping(value))
  };
};

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "standard", // default delivery option
      tooltipOpen: false
    };
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  toggleTooltip() {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }

  componentDidMount() {
    if (this.props.subtotal >= 100) {
      this.setState({ option: "free" });
    }
  }

  handleOptionChange = async e => {
    await this.setState({ option: e.target.value });
    switch (this.state.option) {
      case "free":
        this.props.setShipping("free");
        break;
      case "collection":
        this.props.setShipping("collection");
        break;
      case "express":
        this.props.setShipping("express");
        break;
      default:
        this.props.setShipping("standard");
    }
  };

  render() {
    const { handleSubmit, previousPage, subtotal } = this.props;

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
                disabled={subtotal < 100}
                checked={this.state.option === "free" && subtotal >= 100}
                onChange={this.handleOptionChange}
              />
              <Label className="radio" htmlFor="free">
                <span
                  id="tooltip"
                  className="d-block text-uppercase font-weight-bold"
                >
                  Free standard delivery
                </span>
                <span className="text-muted my-2">
                  {subtotal < 100 ? (
                    <Tooltip
                      trigger="hover"
                      autohide={false}
                      placement="bottom"
                      isOpen={this.state.tooltipOpen}
                      target="tooltip"
                      toggle={this.toggleTooltip}
                    >
                      This option will activate once you add items worth £
                      {parseFloat(100 - subtotal).toFixed(2)} or more.
                    </Tooltip>
                  ) : (
                    "You are eligible for FREE delivery!"
                  )}
                </span>
                <span className="text-muted">
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
                <span className="text-muted">
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
                <span className="text-muted ">
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
                <span className="d-block text-uppercase mb-2 font-weight-bold">
                  Collection
                </span>
                <span className="text-muted">
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

Delivery.propTypes = {
  subtotal: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  setShipping: PropTypes.func.isRequired
};

Delivery = reduxForm({
  form: "checkout",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // unregister fields on unmount
  keepDirtyOnReinitialize: true,
  updateUnregisteredFields: true,
  enableReinitialize: true
})(Delivery);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);
