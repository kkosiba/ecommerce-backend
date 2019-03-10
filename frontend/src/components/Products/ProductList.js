import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../store/actions/storeActions";

import Product from "./Product";

const mapStateToProps = state => {
  return state.store;
};

class ProductList extends Component {

  componentDidMount() {
    // console.log(this.state.loading);
    this.props.dispatch(fetchProducts());
    //   console.log(this.state.loading);
    // } catch (error) {
    //   console.log("Error loading products.")
    // }
  }

  render() {
    const { products, loading, /* error */ } = this.props;

    return loading ? (
      <React.Fragment>
        <h1 className="mb-3 text-center">LOADING!</h1>
      </React.Fragment>
    ) : (
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
