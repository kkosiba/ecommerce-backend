import { ADD_PRODUCT_TO_CART } from "../constants/action-types";
import { REMOVE_PRODUCT_FROM_CART } from "../constants/action-types";

export function addProductToCart(payload) {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: payload
  };
}

export function removeProductFromCart(payload) {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: payload
  };
}
