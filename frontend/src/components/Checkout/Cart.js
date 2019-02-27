import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { Link } from "react-router-dom";

import OrderSummary from "./OrderSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = state => {
  return {
    cartItems: state.store.cart.items,
    cartSubtotal: state.store.cart.subtotal,
    tax: state.store.tax,
    shipping: state.checkout.shipping
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: product => dispatch(actions.addProductToCart(product, 1)),
    removeProductFromCart: product =>
      dispatch(actions.removeProductFromCart(product)),
    updateProductQuantity: (product, qnt) =>
      dispatch(actions.updateProductQuantity(product, qnt)),
    incProductQuantity: item => dispatch(actions.incProductQuantity(item)),
    decProductQuantity: item => dispatch(actions.decProductQuantity(item)),
    emptyCart: () => dispatch(actions.emptyCart()),
    calculateCart: () => dispatch(actions.calculateCart()),
    setShipping: value => dispatch(actions.setShipping(value))
  };
};

class Cart extends Component {
  
  componentDidMount() {
    this.props.calculateCart();
  }

  componentDidUpdate() {
    this.props.calculateCart();
    if (this.props.cartSubtotal >= 100) {
      this.props.setShipping(0);
      alert("You are eligible for FREE delivery!")
    } else {
      this.props.setShipping(5);
    }
  }

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
          Your cart is empty. Why not add something? :)
        </h3>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h3>My Cart</h3>
        <div className="row">
          <div className="col-lg-8">
            <div className="cart">
              <div className="cart-wrapper">
                <div className="cart-header text-uppercase text-center font-weight-bold">
                  <div className="row">
                    <div className="col-5">Item</div>
                    <div className="col-2">Price</div>
                    <div className="ml-1 col-2">Quantity</div>
                    <div className="col-2">Total</div>
                    <div className="col-1"> </div>
                  </div>
                </div>
                <div className="border-bottom">
                  {cart.map((item, index) => (
                    <div className="p-4 border-top" key={item.id}>
                      <div className="row d-flex align-items-center text-center">
                        <div className="col-5">
                          <div className="d-flex align-items-center">
                            <img
                              className="product-image"
                              alt={item.name}
                              src={item.picture}
                            />
                            <Link
                              to={`/product/${item.slug}`}
                              className="cart-title"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </div>
                        <div className="col-2">£{item.price}</div>
                        <div className="col-2">
                          <div className="d-flex align-items-center">
                            <div
                              className="p-1"
                              onClick={() =>
                                this.props.decProductQuantity(item)
                              }
                            >
                              <FontAwesomeIcon icon={["far", "minus-square"]} />
                            </div>
                            <input
                              disabled
                              className="form-control rounded-0"
                              type="number"
                              value={item.quantity}
                              onChange={e =>
                                this.props.updateProductQuantity(
                                  item,
                                  e.target.value
                                )
                              }
                            />
                            <div
                              className="p-1"
                              onClick={() =>
                                this.props.incProductQuantity(item)
                              }
                            >
                              <FontAwesomeIcon icon={["far", "plus-square"]} />
                            </div>
                          </div>
                        </div>
                        <div className="col-2 text-center">
                          £{(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="col-1 text-center">
                          <Link
                            to="/cart"
                            onClick={() =>
                              this.props.removeProductFromCart(item)
                            }
                          >
                            <FontAwesomeIcon
                              icon={["far", "times-circle"]}
                              className="text-danger"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="d-flex my-4">
              <Link
                to="/cart"
                className="btn btn-sm btn-danger ml-auto"
                onClick={() => this.props.emptyCart()}
              >
                <FontAwesomeIcon icon="trash-alt" /> Empty cart
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              afterTax={afterTax}
              totalPrice={totalPrice}
              cart={true}
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
)(Cart);
