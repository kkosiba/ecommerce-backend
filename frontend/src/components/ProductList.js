import React, { Component } from "react";
import Product from "./Product";

import { connect } from "react-redux";
import { fetchProducts } from "../store/actions";

const mapStateToProps = state => {
  return { products: state.products };
};

class ConnectedProductList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { products } = this.props;
    return (
      <React.Fragment>
        <h1>Product List</h1>
        <ul className="item-grid list-unstyled mb-4">
          {products.map(item => (
            <li key={item.id}>
              <Product item={item} />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

const ProductList = connect(mapStateToProps)(ConnectedProductList)

export default ProductList;
