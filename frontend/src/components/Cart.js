import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UpdateQuantityInCart from "./UpdateQuantityInCart";
// import Checkout from "./Checkout";
// import CheckoutButton from "./CheckoutButton";

const mapStateToProps = state => {
  return { cart: state.cart };
};

class ConnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: 0.2,
      shipping: 5
    };
  }

  emptyCart = () => {
    this.setState({ cart: [] });
  };

  updateItem = (item, quantity) => {
    // check if item.quantity > 0 and if quantity >= item.quantity
    // to make sure we're not selling something we don't have ;)
    // this.setState({cart.item.quantity: quantity});
  };

  removeItem = item => {
    const cartItems = this.state.cart;
    let index = cartItems.indexOf(item);
    if (index !== -1) { // check if the item exists in cartItems
      cartItems.splice(index, 1);
    } else {
      console.log("Item does not exist!");
    }
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
          <table className="table table-hover">
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
                      <div className="col-2 pr-4">
                        <img
                          className="product-image"
                          alt={item.name}
                          src={item.picture}
                        />
                      </div>
                      <div className="col-8">
                        <Link to={`/product/${item.slug}`}>
                          {item.description}
                        </Link>
                      </div>
                      <div className="col-2 text-center pl-2">
                        <Link to="/cart" onClick={() => this.removeItem(item)}>
                          Remove? <i class="far fa-times-circle text-danger" />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>£{item.price}</td>
                  <td>
                    <UpdateQuantityInCart
                      quantity={item.quantity}
                      min="0"
                      max="10"
                    /></td>
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
                Empty cart
              </Link>
              <Link to="/" className="btn btn-primary">
                Continue shopping
              </Link>
              <Link to="/checkout" className="btn btn-success">
                Checkout
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

const Cart = connect(mapStateToProps)(ConnectedCart)

export default Cart;
