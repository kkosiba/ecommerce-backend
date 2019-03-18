import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, FormSection, reduxForm } from "redux-form";
import RenderField from "./RenderField";
import validate from "../Utilities/Validate";
import { toggleDifferentBillingAddress } from "../../store/actions/storeActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, FormGroup, Row, Collapse } from "reactstrap";
import { Accordion } from "../Utilities/Accordion";
import PayPal from "./PayPal";
// import CardPayment from "./CardPayment";

const mapStateToProps = state => {
  return {
    paymentStatus: state.store.paymentStatus,
    initialValues: {
      isDifferentBilling: state.store.isDifferentBillingAddress
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDifferentBillingAddress: () =>
      dispatch(toggleDifferentBillingAddress())
  };
};

class Payment extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      collapse: false
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
    this.props.toggleDifferentBillingAddress();
  }

  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
          <Accordion open={1}>
            <Accordion.Item>
              <Accordion.Header>
                Pay by card (TO BE IMPLEMENTED)
              </Accordion.Header>
              <Accordion.Body>
                {/* <CardPayment /> */}
                <div className="my-2">
                  <Field
                    name="isDifferentBilling"
                    type="checkbox"
                    component="input"
                    onClick={this.toggle}
                  />{" "}
                  Use a different billing address
                </div>
                <Collapse isOpen={this.state.collapse}>
                  <FormSection name="billingAddress">
                    <Row>
                      <FormGroup className="col-md-6">
                        <Field
                          name="firstName"
                          type="text"
                          component={RenderField}
                          label="First Name"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Field
                          name="lastName"
                          type="text"
                          component={RenderField}
                          label="Last Name"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Field
                          name="city"
                          type="text"
                          component={RenderField}
                          label="City"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Field
                          name="street"
                          type="text"
                          component={RenderField}
                          label="Street"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Field
                          name="postcode"
                          type="text"
                          component={RenderField}
                          label="Postcode"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Field
                          name="phoneNumber"
                          type="text"
                          component={RenderField}
                          label="Phone Number"
                        />
                      </FormGroup>
                    </Row>
                  </FormSection>
                </Collapse>
                <div className="d-flex">
                  <Button type="submit" className="btn btn-dark ml-auto">
                    Order & Pay
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>PayPal</Accordion.Header>
              <Accordion.Body>
                <PayPal />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button
            type="button"
            className="btn btn-link text-muted bg-white my-4"
            onClick={previousPage}
          >
            <FontAwesomeIcon icon="angle-left" />
            <span className="ml-2">Go back</span>
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

Payment.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  toggleDifferentBillingAddress: PropTypes.func.isRequired
};

Payment = reduxForm({
  form: "checkout",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // unregister fields on unmount
  keepDirtyOnReinitialize: true,
  updateUnregisteredFields: true,
  enableReinitialize: true,
  validate
})(Payment);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
