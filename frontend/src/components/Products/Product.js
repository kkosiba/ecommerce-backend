import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addProductToCart, removeProductFromCart } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = state => {
  return { cart: state.store.cart };
};

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: item => dispatch(addProductToCart(item, 1)),
    removeProductFromCart: item => dispatch(removeProductFromCart(item))
  };
}

class Product extends Component {
  inCart = () => {
    const { item, cart } = this.props;
    const res = cart.items.find(e => e.id === item.id);
    if (res) {
      return res.quantity;
    } else {
      return 0;
    }
  };

  render() {
    const { item } = this.props;

    return (
      <div className="card rounded-0 shadow">
        <Link to={`/product/${item.slug}`} className="text-dark">
          <img
            className="card-img-top rounded-0"
            src={item.picture}
            alt={item.name}
          />
        </Link>
        <div className="d-flex flex-column card-body">
          <h5 className="card-text">{item.name}</h5>
          <p className="card-text">
            <strong>Price: £{item.price}</strong>
          </p>
          <div className="d-flex flex-row justify-content-center">
            {item.quantity === 0 ? (
              <strong>Out of stock</strong>
            ) : (
              <div>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => this.props.addProductToCart(item)}
                >
                  <FontAwesomeIcon icon="cart-plus" />
                </button>
                {this.inCart() > 0 ? (
                  <button
                    type="submit"
                    className="btn btn-danger ml-1"
                    onClick={() => this.props.removeProductFromCart(item)}
                  >
                    <FontAwesomeIcon icon="trash-alt" />
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
