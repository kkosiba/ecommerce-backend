import axios from "axios";
import { API_PATH } from "../../backend_url";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_CLEAR_ERRORS = "AUTH_CLEAR_ERRORS";


export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token, expirationDate) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationDate", expirationDate);
  return {
    type: AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
};

export const authClearErrors = () => {
  return {
    type: AUTH_CLEAR_ERRORS
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
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
  email,
  password1,
  password2,
  first_name,
  last_name
) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${API_PATH}accounts/register/`, {
        email: email,
        password1: password1,
        password2: password2,
        first_name: first_name,
        last_name: last_name
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
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
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
