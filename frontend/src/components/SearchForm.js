import React, { Component } from "react";
import { Link } from "react-router-dom";

import { MDBFormInline, MDBIcon } from "mdbreact";

export default class SearchForm extends Component {

  state = {
    query: ""
  };


  renderSearchForm = () => {
    return (
      <MDBFormInline className="md-form">
        <div className="input-group">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search store..."
            aria-label="Search store..."
            onChange={e => this.setState({ query: e.target.value })}
          />
          <div className="input-group-append">
            <Link to={`/search/${this.state.query}`}>
              <button
                type="submit"
                className="btn btn-outline-secondary"
              >
                <MDBIcon className="text-white" icon="search" />
              </button>
            </Link>
          </div>
        </div>
      </MDBFormInline>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.renderSearchForm()}
      </React.Fragment>
    );
  }
}
