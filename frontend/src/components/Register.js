import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleClick = (event) => {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:8000/api/auth/register/", data)
      .then(res => {
        console.log(res);
        if (res.data.code === '200') {
          console.log("Login successful");
        } else if (res.data.code === '204') {
          console.log("Username password do not match");
          alert("username and password do not match");
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(err => console.log(err))
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
