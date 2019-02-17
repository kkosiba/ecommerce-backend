import * as actions from "../constants/action-types";
import axios from "axios";
import { API_PATH } from "../../backend_url";

export function addProductToCart(item, quantity) {
  return {
    type: actions.ADD_PRODUCT_TO_CART,
    item: item,
    quantity: quantity
  };
}

export function removeProductFromCart(item) {
  return {
    type: actions.REMOVE_PRODUCT_FROM_CART,
    item: item
  };
}

export function updateProductQuantity(item, quantity) {
  return {
    type: actions.UPDATE_PRODUCT_QUANTITY,
    item: item,
    quantity: quantity
  };
}

export function incProductQuantity(item) {
  return {
    type: actions.INC_PRODUCT_QUANTITY,
    item: item
  };
}

export function decProductQuantity(item) {
  return {
    type: actions.DEC_PRODUCT_QUANTITY,
    item: item
  };
}

export function emptyCart() {
  return {
    type: actions.EMPTY_CART
  };
}

export function updateStock() {
  return {
    type: actions.UPDATE_STOCK
  };
}

export function fetchProducts(query = "") {
  return dispatch => {
    if (query === "") {
      return axios
        .get(`${API_PATH}products/`)
        .then(res => {
          dispatch(fetchProductsSuccess(res.data));
        })
        .catch(err => console.log(err));
    } else {
      return axios
        .get(`${API_PATH}products/?search=${query}`)
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
