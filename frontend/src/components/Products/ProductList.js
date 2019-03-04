import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../store/actions";

import Product from "./Product";

const mapStateToProps = state => {
  return { products: state.store.products };
};

class ProductList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { products } = this.props;

    return (
      <React.Fragment>
        <h1 className="mb-3 text-center">All Products</h1>
        {/* <ul className="item-grid list-unstyled mb-4"> */}
        <ul className="grid list-unstyled mb-4">
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

export default connect(mapStateToProps)(ProductList);
