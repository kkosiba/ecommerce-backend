import React, { Component } from "react";

import { Link } from "react-router-dom";
import UpdateQuantityInCart from "./UpdateQuantityInCart";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: 0.2,
      shipping: 5
    };
  }

  emptyCart = () => {
    this.props.emptyCart();
  };

  updateItemQuantity = (item, value) => {
    this.props.updateProductQuantity(item, value);
  };

  incrementItemQuantity = (item) => {
    const currentValue = item.quantity;
    this.updateItemQuantity(item, currentValue + 1);
  };

  decrementItemQuantity = (item) => {
    const currentValue = item.quantity;
    this.updateItemQuantity(item, currentValue - 1);
  };

  updateItem = (item, quantity) => {
    // check if item.quantity > 0 and if quantity >= item.quantity
    // to make sure we're not selling something we don't have ;)
    // this.setState({cart.item.quantity: quantity});
  };

  removeItem = item => {
    this.props.removeProductFromCart(item);
  };

  singleItemTotal = item => {
    return item.price * item.quantity;
  };

  calculate = () => {
    // returns an object with attributes subtotal and afterTax
    const { cart } = this.props;
    let subtotal = 0.0;
    cart.map(item => (subtotal += this.singleItemTotal(item)));
    const afterTax = this.state.tax * subtotal;
    return { subtotal: subtotal, afterTax: afterTax };
  };

  totalPrice = () => {
    return (
      this.calculate().subtotal +
      this.calculate().afterTax +
      this.state.shipping
    );
  };

  render() {
    const { cart } = this.props;
    if (cart.length === 0) {
      return (
        <p className="pt-2">Your cart is empty. Why not add something? :)</p>
      );
    } else {
      return (
        <React.Fragment>
          <h3>My Cart</h3>
          <table className="table table-hover table-responsive">
            <thead className="text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <div className="row">
                      <div className="col-md-2 my-auto">
                        <img
                          className="product-image"
                          alt={item.name}
                          src={item.picture}
                        />
                      </div>
                      <div className="col-md-8 my-auto">
                        <div className="pl-2 d-flex flex-column">
                          <Link to={`/product/${item.slug}`}>
                            {item.name}
                          </Link>
                          <p>{item.description}</p>
                        </div>
                      </div>
                      <div className="col-md-2 text-center pl-2 my-auto">
                        <Link to="/cart" onClick={() => this.props.removeProductFromCart(item)}>
                          Remove? <i class="far fa-times-circle text-danger" />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>£{item.price}</td>
                  <td>
                    <div className="d-flex">
                      <button className="btn" onClick={()=>{this.decrementItemQuantity(item)}}>
                        <i className="far fa-minus-square"></i>
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        min="0"
                        max="10"
                        step="1"
                        onChange={e => {this.updateItemQuantity(item, e.target.value)}}
                      />
                      <button className="btn" onClick={()=>{this.incrementItemQuantity(item)}}>
                        <i className="far fa-plus-square"></i>
                      </button>
                    </div>
                  </td>
                  <td>£{this.singleItemTotal(item).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colspan="3" />
                <td>
                  <b>Subtotal</b>
                </td>
                <td>£{this.calculate().subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" />
                <td>
                  <b>Tax (20%)</b>
                </td>
                <td>£{this.calculate().afterTax.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" />
                <td>
                  <b>Shipping</b>
                </td>
                <td>£5</td>
              </tr>
              <tr>
                <td colspan="3" />
                <td>
                  <b>Total</b>
                </td>
                <td>£{this.totalPrice().toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-right">
            <div className="btn-group" role="group">
              <Link
                to="/cart"
                className="btn btn-danger"
                onClick={() => this.emptyCart()}
              >
                <i class="far fa-trash-alt" /> Empty cart
              </Link>
              <Link to="/" className="btn btn-primary">
                Continue shopping
              </Link>
              <Link to="/checkout" className="btn btn-success">
                <i class="far fa-credit-card" />  Checkout
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Cart;
