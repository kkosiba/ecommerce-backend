import React, { Component } from "react";
// import { Link } from "react-router-dom";

export default class Newsletter extends Component {
  render() {
    return (
      <React.Fragment>
        <h5 className="font-weight-bold">Subscribe to our newsletter!</h5>
        <form className="form-inline justify-content-center">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Your email address"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Subscribe!
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
