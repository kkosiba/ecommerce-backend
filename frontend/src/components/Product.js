import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Product extends Component {
  render() {
    const { name, slug, picture, price } = this.props;
    // const inCart = false;

    return (
      <Link to={`/product/${slug}`} className="text-dark">
        <div className="card rounded-0">
          <img className="card-img-top rounded-0" src={picture} alt={name} />
          <div className="card-body">
            <p className="card-text">{name}</p>
            {/* <p className="card-text">{description}</p> */}
            <p className="card-text">Price: £{price}</p>
          </div>
        </div>
      </Link>
    );
  }
}
