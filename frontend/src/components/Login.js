import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      <form>
        <fieldset>
          <legend>Login</legend>
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
            <button type="submit" onClick={e => this.handleSubmit()}>
              Login
            </button>
          </p>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </fieldset>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
