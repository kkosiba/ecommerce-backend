import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addProductToCart,
         removeProductFromCart } from "../store/actions";

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: item => dispatch(addProductToCart(item, 1)),
    removeProductFromCart: item => dispatch(removeProductFromCart(item)),
  };
}

class Product extends Component {

  inCart = () => {
    const { item, cart } = this.props;
    return cart.some(e => e.id === item.id);
  };

  render() {
    const { item } = this.props;

    return (
      <div className="card rounded-0">
        <Link to={`/product/${item.slug}`} className="text-dark">
        <img className="card-img-top rounded-0" src={item.picture} alt={item.name} />
        </Link>
        <div className="d-flex flex-column card-body">
          <h5 className="card-text">{item.name}</h5>
          <p className="card-text"><strong>Price: £{item.price}</strong></p>
          <div className="d-flex flex-row justify-content-center">
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => this.props.addProductToCart(item)}
            >
              <i class="fas fa-cart-plus"></i>
            </button>
            {this.inCart() ?
              <button
                type="submit"
                className="btn btn-danger ml-1"
                onClick={() => this.props.removeProductFromCart(item)}
              >
              <i class="far fa-trash-alt"></i>
              </button>:""}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
