import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import validate from "../Utilities/validate";
import RenderField from "./RenderField";
import { Link } from "react-router-dom";

import { Form, FormGroup, Button, Row /* Collapse,*/ } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Address extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      collapse: false,
      differentShippingAddress: false
    };
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse,
      differentShippingAddress: !this.state.differentShippingAddress
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <React.Fragment>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <h6 className="text-uppercase mb-3 font-weight-bold">
            Invoice address
          </h6>
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
                name="email"
                type="text"
                component={RenderField}
                label="Email Address"
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
          {/* <div className="ml-5 my-2">
                <Input type="checkbox" onClick={this.toggle} /> Use a different
                shipping address
              </div>
              <Collapse isOpen={this.state.collapse}>
                <FormGroup className="mt-3">
                  <div className="block">
                    <div className="block-header">
                      <h6 className="text-uppercase mb-3 font-weight-bold">
                        Shipping address
                      </h6>
                    </div>
                    <div className="block-body">
                      <div className="row">
                        <FormGroup className="col-md-6">
                          <Label>Street</Label>
                          <Input
                            type="text"
                            onChange={e =>
                              this.setState({
                                shippingAddress: { street: e.target.value }
                              })
                            }
                          />
                        </FormGroup>
                        <FormGroup className="col-md-6">
                          <Label>City</Label>
                          <Input
                            type="text"
                            onChange={e =>
                              this.setState({
                                shippingAddress: { city: e.target.value }
                              })
                            }
                          />
                        </FormGroup>
                        <FormGroup className="col-md-6">
                          <Label>Postcode</Label>
                          <Input
                            type="text"
                            onChange={e =>
                              this.setState({
                                shippingAddress: { postcode: e.target.value }
                              })
                            }
                          />
                        </FormGroup>
                        <FormGroup className="col-md-6">
                          <Label>Phone Number</Label>
                          <Input
                            type="text"
                            onChange={e =>
                              this.setState({
                                shippingAddress: { phoneNumber: e.target.value }
                              })
                            }
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Collapse> */}
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
}

export default reduxForm({
  form: "checkout",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // unregister fields on unmount
  validate
})(Address);
