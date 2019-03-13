import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProducts } from "../../store/actions/storeActions";
import { Spinner } from "reactstrap";

import Product from "./Product";

const mapStateToProps = state => {
  return state.store;
};

class ProductList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { products, loading /* error */ } = this.props;

    return loading ? (
      <Spinner
        color="secondary"
        style={{ width: "3rem", height: "3rem" }}
        className="m-auto"
      />
    ) : (
      <React.Fragment>
        <h1 className="mb-3 text-center">All Products</h1>
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

ProductList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  products: PropTypes.array
};

export default connect(mapStateToProps)(ProductList);
