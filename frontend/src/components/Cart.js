import React, { Component } from "react";

import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: 0.2,
      shipping: 5
    };
  }

  singleItemTotal = item => {
    const res = item.price * item.quantity;
    return res.toFixed(2);
  };

  calculate = () => {
    // returns an object with attributes subtotal, afterTax and totalPrice
    const { cart } = this.props;
    let subtotal = 0.0;
    cart.map(item => (subtotal += item.price * item.quantity));
    const afterTax = this.state.tax * subtotal;
    const totalPrice = subtotal + afterTax + this.state.shipping;
    return {
      subtotal: subtotal.toFixed(2),
      afterTax: afterTax.toFixed(2),
      totalPrice: totalPrice.toFixed(2)
    };
  };

  render() {
    const { cart } = this.props;
    console.log(cart);
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
                <div className="cart-header text-center">
                  <div class="row">
                    <div class="col-5">Item</div>
                    <div class="col-2">Price</div>
                    <div class="col-2">Quantity</div>
                    <div class="col-2">Total</div>
                    <div class="col-1"> </div>
                  </div>
                </div>
                <div className="cart-body">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={item.id}>
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
                              <i className="far fa-minus-square" />
                            </div>
                            <input
                              className="form-control rounded-0"
                              type="number"
                              name="quantity"
                              value={item.quantity}
                              min="0"
                              max="10"
                              step="1"
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
                              <i className="far fa-plus-square" />
                            </div>
                          </div>
                        </div>
                        <div className="col-2 text-center">
                          £{this.singleItemTotal(item)}
                        </div>
                        <div className="col-1 text-center">
                          <Link
                            to="/cart"
                            onClick={() =>
                              this.props.removeProductFromCart(item)
                            }
                          >
                            <i class="far fa-times-circle text-danger" />
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
                <i class="far fa-trash-alt" /> Empty cart
              </Link>
            </div>
            
          </div>
          <div className="col-lg-4">
            <div className="bg-light p-4">
              <h6 className="text-uppercase font-weight-bold px-2">
                Order Summary
              </h6>
              <hr />
              <div className="d-flex px-2 my-4">
                <span>Order Subtotal</span>
                <span className="ml-auto">£{this.calculate().subtotal}</span>
              </div>
              <hr />
              <div className="d-flex px-2 my-4">
                <span>Shipping</span>
                <span className="ml-auto">£{this.state.shipping}</span>
              </div>
              <hr />
              <div className="d-flex px-2 my-4">
                <span>Tax (20%)</span>
                <span className="ml-auto">£{this.calculate().afterTax}</span>
              </div>
              <hr />
              <div className="d-flex px-2 my-4">
                <span>Total</span>
                <span className="ml-auto font-weight-bold">
                  £{this.calculate().totalPrice}
                </span>
              </div>

              <div className="d-flex justify-content-between flex-column flex-lg-row">
                <Link to="/" className="btn btn-sm btn-default">
                  <i class="fas fa-chevron-left" /> Continue shopping
                </Link>
                <Link to="/checkout" className="btn btn-sm btn-dark">
                  Checkout <i class="fas fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
