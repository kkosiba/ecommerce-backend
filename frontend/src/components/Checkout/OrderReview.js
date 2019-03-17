import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Row, Col, Button, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = state => {
  return state.store;
};

class OrderReview extends Component {
  render() {
    const { handleSubmit, previousPage, cart } = this.props;

    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
          <div className="cart">
            <div className="cart-wrapper">
              <div className="cart-header text-uppercase text-center font-weight-bold">
                <Row>
                  <Col xs="5">Item</Col>
                  <Col xs="2">Price</Col>
                  <Col xs="2">Quantity</Col>
                  <Col xs="2">Total</Col>
                </Row>
              </div>
              <div className="cart-body">
                {cart.map((item, index) => (
                  <div className="p-4 border-top" key={item.id}>
                    <Row className="d-flex align-items-center text-center">
                      <Col xs="5">
                        <div className="d-flex align-items-center">
                          <img
                            className="product-image"
                            alt={item.name}
                            src={item.picture}
                          />
                          <span className="cart-title">{item.name}</span>
                        </div>
                      </Col>
                      <Col xs="2">£{item.price}</Col>
                      <Col xs="2" className="ml-2">
                        {item.quantity}
                      </Col>
                      <Col xs="2" className="ml-1 text-center">
                        £{parseFloat(item.price * item.quantity).toFixed(2)}
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
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
              <span className="mr-2">Choose payment method</span>
              <FontAwesomeIcon icon="angle-right" />
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

OrderReview.propTypes = {
  cart: PropTypes.array,
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func
};

OrderReview = connect(mapStateToProps)(OrderReview);

export default reduxForm({
  form: "checkout",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(OrderReview);
