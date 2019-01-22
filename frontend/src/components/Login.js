import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.error("Not implemented!");
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
