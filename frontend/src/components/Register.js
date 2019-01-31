import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

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
      <form>
        <fieldset>
          <legend>Register new account</legend>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </p>
          <p>
            <button
              type="submit"
              onClick={event => this.handleClick(event)}
            > Register</button>
          </p>
        </fieldset>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
