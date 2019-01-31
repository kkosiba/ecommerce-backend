import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { addProductToCart,
         updateProductQuantity,
         removeProductFromCart } from "../store/actions";

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: item => dispatch(addProductToCart(item, 1)),
    updateProductQuantity: (item, qnt) => dispatch(updateProductQuantity(item, qnt)),
    removeProductFromCart: item => dispatch(removeProductFromCart(item)),
  };
}

class ProductDetails extends Component {
  state = {
    product: {},
    quantity: 0
  };

  inCart = () => {
    const { cart } = this.props;
    return cart.some(e => e.id === this.state.product.id);
  };

  addToCart = () => {
    const product = this.state.productDetails;
    this.props.addProductToCart(product);
  };

  updateQuantity = (value) => {
    this.props.updateProductQuantity(this.props.item, value);
  };

  removeFromCart = () => {
    this.props.removeProductFromCart(this.props.item);
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`http://localhost:8000/api/products/${params.slug}`)
      .then(res => this.setState({ product: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { product } = this.state;
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="card rounded-0">
            <img
              className="card-img-top rounded-0"
              src={product.picture}
              alt={product.name}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card rounded-0">
            <div className="card-body">
              <h3>
                <strong>{product.name}</strong>
              </h3>
              <p className="card-text pt-2">{product.description}</p>
              <p className="card-text pt-2"><strong>Price:</strong> £{product.price}</p>

              <hr />

              <div className="input-group justify-content-center">
                <div className="input-group-prepend">
                  <button class="btn btn-info" type="button">
                    <Link to="/" className="text-white">
                      <i class="far fa-list-alt"></i> All products
                    </Link>
                  </button>
                </div>
                <input
                  type="number"
                  value="1"
                  min="1"
                  max={product.quantity}
                  step="1"
                  // className="form-control"
                  onChange={e => {this.updateQuantity(e.target.value)}}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={() => this.props.addProductToCart(product)}
                  >
                    <i class="fas fa-cart-plus"></i>
                  </button>
                  {this.inCart() ?
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.props.removeProductFromCart(product)}
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                :""}
                </div>
              </div>



            </div>
            </div>
          </div>
        </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
