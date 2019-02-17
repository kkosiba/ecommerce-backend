import { combineReducers } from "redux";
import * as actions from "../constants/action-types";

import { authStart, authSuccess, authFail, authLogout } from "./auth";
import {
  addProductToCart,
  removeProductFromCart,
  incProductQuantity,
  decProductQuantity,
  updateProductQuantity,
  emptyCart,
  fetchProducts
} from "./products";

const initialState = {
  auth: {
    token: null,
    error: null,
    loading: false
  },
  store: {
    products: [],
    cart: [],
    checkout: []
  }
};

function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state, action);

    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actions.AUTH_FAIL:
      return authFail(state, action);

    case actions.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
}

function storeReducer(state = initialState.store, action) {
  switch (action.type) {
    case actions.FETCH_PRODUCTS_SUCCESS:
      return fetchProducts(state, action);

    case actions.ADD_PRODUCT_TO_CART:
      return addProductToCart(state, action);

    case actions.REMOVE_PRODUCT_FROM_CART:
      return removeProductFromCart(state, action);

    case actions.UPDATE_PRODUCT_QUANTITY:
      return updateProductQuantity(state, action);

    case actions.INC_PRODUCT_QUANTITY:
      return incProductQuantity(state, action);

    case actions.DEC_PRODUCT_QUANTITY:
      return decProductQuantity(state, action);

    case actions.EMPTY_CART:
      return emptyCart(state, action);

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  auth: authReducer,
  store: storeReducer
});
