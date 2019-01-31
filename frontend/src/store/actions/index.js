import * as actions from "../constants/action-types";
import axios from "axios";


export function addProductToCart(item, quantity) {
  return {
    type: actions.ADD_PRODUCT_TO_CART,
    item,
    quantity
  };
}

export function removeProductFromCart(item) {
  return {
    type: actions.REMOVE_PRODUCT_FROM_CART,
    item
  };
}

export function updateProductQuantity(item, quantity) {
  return {
    type: actions.UPDATE_PRODUCT_QUANTITY,
    item,
    quantity
  };
}

export function emptyCart() {
  return {
    type: actions.EMPTY_CART
  };
}

export function fetchProducts(query="") {
  return dispatch => {
    if (query === "") {
      return axios
            .get("http://localhost:8000/api/products/")
            .then(res => {
              dispatch(fetchProductsSuccess(res.data));
            })
            .catch(err => console.log(err));
    } else {
      return axios
            .get(`http://localhost:8000/api/products/?search=${query}`)
            .then(res => {
              dispatch(fetchProductsSuccess(res.data));
            })
            .catch(err => console.log(err));
    }
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: actions.FETCH_PRODUCTS_SUCCESS,
    products
  };
}

export function removeProductFromStock(item, quantity) {
  return {
    type: actions.REMOVE_PRODUCT_FROM_STOCK,
    item,
    quantity
  };
}


// AUTHENTICATION
export const authStart = () => {
  return {
    type: actions.AUTH_START
  }
};

export const authSuccess = (token) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token
  }
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return {
    type: actions.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post('http://localhost:8000/api/auth/login/', {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.token;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      })
  };
};

export const authSignup = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post('http://localhost:8000/api/auth/register/', {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      })
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
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
};
