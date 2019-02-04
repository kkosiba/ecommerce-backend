import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import { MDBInput } from "mdbreact";


const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authSignup(username, password))
  }
};

class Register extends Component {

  state = {
    username: "",
    password: ""
  };

  handleClick = e => {
    e.preventDefault();
    this.props.onAuth(this.state.username, this.state.password);
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group mx-auto card p-3 w-50">
          <h3 className="text-center font-weight-bold">Register</h3>
          <MDBInput
            label="Username"
            type="text"
            id="username"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <MDBInput
            label="Password"
            type="password"
            id="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button
            type="submit"
            className="btn btn-primary w-25 mx-auto"
            onClick={e => this.handleSubmit()}>
            Register
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
