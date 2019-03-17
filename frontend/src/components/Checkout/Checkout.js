import React, { Component } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";
import { connect } from "react-redux";
import {
  setPayment,
  toggleCheckoutComplete,
  emptyCart
} from "../../store/actions/storeActions";
import { reset } from "redux-form";
import Address from "./Address";
import Delivery from "./Delivery";
import Payment from "./Payment";
import OrderReview from "./OrderReview";
import OrderFinal from "./OrderFinal";
import OrderSummary from "./OrderSummary";
import CheckoutNavbar from "./CheckoutNavbar";
import { Row, Col } from "reactstrap";

const mapStateToProps = state => {
  return state.store;
};

const mapDispatchToProps = dispatch => {
  return {
    setPayment: value => dispatch(setPayment(value)),
    // placeOrder: values => dispatch(placeOrder(values)), // NOT YET IMPLEMENTED
    // updateStock: data => dispatch(updateStock(data)), // NOT YET IMPLEMENTED
    emptyCart: () => dispatch(emptyCart()),
    toggleCheckoutComplete: () => dispatch(toggleCheckoutComplete()),
    resetCheckoutForm: () => dispatch(reset("checkout"))
  };
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    try {
      const serializedCart = JSON.stringify(cart);
      localStorage.setItem("cart", serializedCart);
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this.props.resetCheckoutForm();
    if (this.props.isCheckoutComplete) this.props.toggleCheckoutComplete();
    this.props.setPayment("");
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handlePayment(values) {
    this.props.toggleCheckoutComplete();
  }

  render() {
    const { page } = this.state;
    const { cart, isCheckoutComplete } = this.props;

    if (isCheckoutComplete) {
      return <OrderFinal />;
    } else if (cart.length === 0) {
      return (
        <React.Fragment>
          <h3 className="text-center mt-2">
            Add some products to the cart first, then come back here :)
          </h3>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Prompt message="Are you sure you want to leave? Your checkout data will be lost." />
          <h3 className="mb-4">Checkout</h3>
          <Row>
            <Col lg="8">
              <CheckoutNavbar active={page} />
              {page === 1 && <Address onSubmit={this.nextPage} />}
              {page === 2 && (
                <Delivery
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                />
              )}
              {page === 3 && (
                <OrderReview
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                />
              )}
              {page === 4 && (
                <Payment
                  previousPage={this.previousPage}
                  onSubmit={this.handlePayment}
                />
              )}
            </Col>
            <div className="col-lg-4">
              <OrderSummary />
            </div>
          </Row>
        </React.Fragment>
      );
    }
  }
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  isCheckoutComplete: PropTypes.bool,
  resetCheckoutForm: PropTypes.func.isRequired,
  setPayment: PropTypes.func.isRequired,
  toggleCheckoutComplete: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
