import axios from "axios";
import { API_PATH } from "../../backend_url";

export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const UPDATE_PRODUCT_QUANTITY = "UPDATE_PRODUCT_QUANTITY";
export const INC_PRODUCT_QUANTITY = "INC_PRODUCT_QUANTITY";
export const DEC_PRODUCT_QUANTITY = "DEC_PRODUCT_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";
export const CALCULATE_CART = "CALCULATE_CART";
export const SET_SHIPPING = "SET_SHIPPING";

export const fetchProducts = (query = "") => {
  return dispatch => {
    dispatch(fetchProductsStart());
    if (query === "") {
      return axios
        .get(`${API_PATH}products/`)
        .then(res => {
          // to simulate server latency
          setTimeout(() => dispatch(fetchProductsSuccess(res.data)),1000);
        })
        .catch(err => dispatch(fetchProductsFail(err)));
    } else {
      return axios
        .get(`${API_PATH}products/?search=${query}`)
        .then(res => {
          dispatch(fetchProductsSuccess(res.data));
        })
        .catch(err => dispatch(fetchProductsFail(err)));
    }
  };
};

export const fetchProductsStart = () => {
  return {
    type: FETCH_PRODUCTS_START
  };
};

export const fetchProductsSuccess = products => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products
  };
};

export const fetchProductsFail = error => {
  return {
    type: FETCH_PRODUCTS_FAIL,
    error
  };
};

export const addProductToCart = (item, quantity) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    item: item,
    quantity: quantity
  };
};

export const removeProductFromCart = item => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    item: item
  };
};

export const updateProductQuantity = (item, quantity) => {
  return {
    type: UPDATE_PRODUCT_QUANTITY,
    item: item,
    quantity: quantity
  };
};

export const incProductQuantity = item => {
  return {
    type: INC_PRODUCT_QUANTITY,
    item: item
  };
};

export const decProductQuantity = item => {
  return {
    type: DEC_PRODUCT_QUANTITY,
    item: item
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART
  };
};

export const calculateCart = () => {
  return {
    type: CALCULATE_CART
  };
};

export const setShipping = value => {
  return {
    type: SET_SHIPPING,
    value
  };
};
