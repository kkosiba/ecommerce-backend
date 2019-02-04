import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAuth(this.state.username, this.state.password);
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group mx-auto card p-3 w-50">
          <h3 className="text-center font-weight-bold">Login</h3>
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
            Login
          </button>
          <p className="text-center pt-2">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
