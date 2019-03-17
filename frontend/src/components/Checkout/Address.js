import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, FormSection, reduxForm } from "redux-form";
import validate from "../Utilities/Validate";
import RenderField from "./RenderField";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Address extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <React.Fragment>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <h6 className="text-uppercase mb-3 font-weight-bold">
            Shipping address
          </h6>
          <FormSection name="shippingAddress">
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

          <div className="my-4 d-flex justify-content-between flex-column flex-lg-row">
            <Button
              tag={Link}
              to={"/cart"}
              className="btn btn-link bg-white text-muted"
            >
              <FontAwesomeIcon icon="angle-left" />
              <span className="ml-2">Back to cart</span>
            </Button>
            <Button color="dark" type="submit">
              <span className="mr-2">Delivery</span>
              <FontAwesomeIcon icon="angle-right" />
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

Address.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: "checkout",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // unregister fields on unmount
  validate
})(Address);
