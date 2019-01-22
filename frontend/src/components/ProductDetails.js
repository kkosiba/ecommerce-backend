import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: []
    };
  }
  
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`http://localhost:8000/api/products/${params.slug}`)
      .then(res => this.setState({ productDetails: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const product = this.state.productDetails;
    return (
      <div className="row">
        <div className="col-6">
          <div className="card rounded-0">
            <img
              className="card-img-top rounded-0"
              src={product.picture}
              alt={product.name}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="card rounded-0">
            <div className="card-body">
              <h3>
                <strong>{product.name}</strong>
              </h3>
              <p className="card-text pt-2">{product.description}</p>
              <p className="card-text pt-2">Price: £{product.price}</p>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary">
                  <Link to="/" className="text-warning">Back to products</Link>
                </button>
                {/* add to cart functionality goes here */}
                <button type="button" className="btn btn-success">
                  <Link to="/" className="text-dark">Add to cart</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
