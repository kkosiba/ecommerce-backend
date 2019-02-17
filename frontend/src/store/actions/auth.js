import * as actions from "../constants/action-types";
import axios from "axios";
import { API_PATH } from "../../backend_url";

export const authSuccess = (token, expirationDate) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationDate", expirationDate);
  return {
    type: actions.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actions.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    axios
      .post(`${API_PATH}accounts/login/`, {
        email: email,
        password: password
      })
      .then(res => {
        const { token } = res.data;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        dispatch(authSuccess(token, expirationDate));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  first_name,
  last_name,
  email,
  password1,
  password2
) => {
  return dispatch => {
    axios
      .post(`${API_PATH}accounts/register/`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.token;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        // automatically log in after successful registration
        dispatch(authSuccess(token, expirationDate));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, expirationDate));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
