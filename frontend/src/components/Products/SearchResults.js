import React, { Component } from "react";
import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { fetchProducts } from "../../store/actions/storeActions";

import Product from "./Product";

const mapStateToProps = state => {
  return state.store;
};

class SearchResults extends Component {
  componentDidMount() {
    const { query } = this.props.match.params;
    this.props.dispatch(fetchProducts(query));
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props.match.params;
    if (query && query !== prevProps.match.params.query) {
      this.props.dispatch(fetchProducts(query));
    }
  }

  renderSearchResults = () => {
    const { products } = this.props;

    if (products.length === 0) {
      return <h6 className="pt-2">No products.</h6>;
    } else {
      return (
        <ul className="grid list-unstyled mb-4">
          {products.map(item => (
            <li key={item.id}>
              <Product item={item} />
            </li>
          ))}
        </ul>
      );
    }
  };

  render() {
    const { query } = this.props.match.params;
    return (
      <React.Fragment>
        <h3>Search results for '{query ? query : " "}':</h3>
        {this.renderSearchResults()}
      </React.Fragment>
    );
  }
}

SearchResults.propTypes = {
  match: PropTypes.object,
  products: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(SearchResults);
