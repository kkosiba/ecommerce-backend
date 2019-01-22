import React, { Component } from "react";
import axios from "axios";
import Product from "./Product";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.refreshProductList();
  }

  refreshProductList = () => {
    axios
      .get("http://localhost:8000/api/products/")
      .then(res => this.setState({ products: res.data }))
      .catch(err => console.log(err));
  };

  renderProductList = () => {
    const products = this.state.products;
    return (
      <ul className="item-grid list-unstyled mb-4">
        {products.map(item => (
          <li key={item.id}>
            <Product 
              name={item.name}
              slug={item.slug}
              description={item.description}
              picture={item.picture}
              price={item.price}
            />
          </li>
        ))}
      </ul>
    )
  };

  render() {
    return (
      <React.Fragment>
        <h1>Product List</h1>
        {this.renderProductList()}
      </React.Fragment>
    );
  }
}
