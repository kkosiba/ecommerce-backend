import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart
} from "../../store/actions/storeActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const mapStateToProps = state => {
  return state.store;
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
    const res = cart.find(e => e.id === item.id);
    return res ? res.quantity : 0;
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

Product.propTypes = {
  cart: PropTypes.array,
  item: PropTypes.object,
  addProductToCart: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
