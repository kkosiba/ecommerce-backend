import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BillingDetails from "./BillingDetails";

const mapStateToProps = state => {
  return { cart: state.cart };
};

class ConnectedCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: 0.2,
      shipping: 5
    };
  }
      // cart: [
      //   // sample items for testing. This data will be generated
      //   // when user clicks on Checkout button in Cart
      //   // i.e. the table in cart will be 'frozen' and 'jsonified',
      //   // then passed to this component as props.
      //   {
      //     id: 0,
      //     name: "Shoe",
      //     slug: "shoe-shoe",
      //     description:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      //     price: 34.95,
      //     quantity: 3,
      //     picture:
      //       "https://images-na.ssl-images-amazon.com/images/I/61KlTNgPluL._SL1001_.jpg",
      //     itemTotal: 104.85
      //   },
      //   {
      //     id: 1,
      //     name: "Shoe2",
      //     slug: "shoe-shoe2",
      //     description:
      //       "Quisque aliquam justo vel enim dignissim, vitae fringilla massa venenatis. Aliquam erat volutpat.",
      //     price: 20.15,
      //     quantity: 2,
      //     picture:
      //       "https://images-na.ssl-images-amazon.com/images/I/61cbAQatNlL._UY395_.jpg",
      //     itemTotal: 40.30
      //   }
      // ],
      // subtotal: 145.15,
      // withTax: 174.18,
      // shipping: 5,
      // total: 179.18

  calculate = () => {
    // returns an object with attributes subtotal and afterTax
    const { cart } = this.props;
    let subtotal = 0.0;
    cart.map(item => (subtotal += item.price * item.quantity));
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

  generateOrderSummary() {
    const { cart } = this.props;
    let itemTotals = [];
    cart.map(item => itemTotals.push(item.quantity));
  }

  render() {
    const { cart } = this.props;

    return (
      <React.Fragment>
        <h3>Order summary</h3>
        <table className="table table-striped">
          <thead className="thead-dark">
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
                  </div>
                </td>
                <td className="text-center">£{item.price}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">£{(item.quantity * item.price).toFixed(2)}</td>
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
              <td>£{this.state.shipping}</td>
            </tr>
            <tr>
              <td colspan="3" />
              <td>
                <b>Total</b>
              </td>
              <td>£{this.totalPrice()}</td>
            </tr>
          </tbody>
        </table>

        <BillingDetails />

        <div className="text-right">
          <div className="btn-group" role="group">
            <Link to="/cart" className="btn btn-primary">
              <i className="fas fa-shopping-cart" /> Back to cart
            </Link>
            <Link to="/payment" className="btn btn-success">
              <i class="far fa-credit-card" /> Proceed to payment
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const Checkout = connect(mapStateToProps)(ConnectedCheckout)

export default Checkout;
