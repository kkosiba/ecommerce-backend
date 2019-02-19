import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import axios from "axios";
import { API_PATH } from "../backend_url";

export default class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${API_PATH}newsletter/add/`, { email: this.state.email })
      .then(res => alert("Successfully subscribed!"))
      .catch(err =>
        alert(`The email ${this.state.email} is already a subscriber!`)
      );
  };

  render() {
    return (
      <React.Fragment>
        <h5 className="font-weight-bold text-white">
          Subscribe to our newsletter!
        </h5>
        <form
          className="form-inline justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <InputGroup>
            <Input
              type="email"
              placeholder="Your email address"
              onChange={e => this.setState({ email: e.target.value })}
            />
            <InputGroupAddon addonType="append">
              <Button className="btn btn-secondary">
                Subscribe! <i className="fas fa-paper-plane" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </React.Fragment>
    );
  }
}
