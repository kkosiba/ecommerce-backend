import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_QUANTITY,
  INC_PRODUCT_QUANTITY,
  DEC_PRODUCT_QUANTITY,
  EMPTY_CART,
  CALCULATE_CART,
  SET_SHIPPING
} from "../actions/storeActions";

import { updateObject } from "../utility";

const initialState = {
  products: [],
  loading: false,
  error: null,

  cart: [], // items in cart
  subtotal: 0,
  tax: 0.2, // 20% tax
  shipping: "standard" // standard shipping is £5
};

export const addProductToCart = (state, action) => {
  const itemInCart = state.cart.find(e => e.id === action.item.id);
  // check if the item is in the cart already
  if (itemInCart) {
    // if it does, increment quantity of an existing item...
    return incProductQuantity(state, action);
  } else {
    // ... if it doesn't, create it
    const newItem = Object.assign({}, action.item);
    newItem.quantity = action.quantity;

    return updateObject(state, {
      cart: state.cart.concat(newItem)
    });
  }
};

export const removeProductFromCart = (state, action) => {
  // get all cart items not matching the item being removed
  const result = state.cart.filter(e => e.id !== action.item.id);
  return updateObject(state, { cart: result });
};

export const incProductQuantity = (state, action) => {
  const cartCopy = JSON.parse(JSON.stringify(state.cart));
  const item = cartCopy.find(e => e.id === action.item.id);
  const itemInStock = state.products.find(e => e.id === action.item.id);
  if (item.quantity < itemInStock.quantity) {
    item.quantity += 1;
  } else {
    item.quantity = itemInStock.quantity;
  }
  return updateObject(state, { cart: cartCopy });
};

export const decProductQuantity = (state, action) => {
  const cartCopy = JSON.parse(JSON.stringify(state.cart));
  const item = cartCopy.find(e => e.id === action.item.id);
  item.quantity -= 1;
  if (item.quantity === 0) {
    return removeProductFromCart(state, action);
  } else {
    return updateObject(state, { cart: cartCopy });
  }
};

export const updateProductQuantity = (state, action) => {
  const cartCopy = JSON.parse(JSON.stringify(state.cart));
  const item = cartCopy.find(e => e.id === action.item.id);
  const itemInStock = state.products.find(e => e.id === action.item.id);

  if (action.quantity < itemInStock.quantity) {
    if (action.quantity <= 0) {
      return removeProductFromCart(state, action);
    } else {
      item.quantity = action.quantity;
    }
  } else {
    item.quantity = itemInStock.quantity;
  }
  return updateObject(state, { cart: cartCopy });
};

export const emptyCart = (state, action) => {
  return updateObject(state, { cart: [] });
};

export const calculateCart = (state, action) => {
  let subtotal = 0;
  state.cart.map(item => (subtotal += item.price * item.quantity));
  return updateObject(state, {
    subtotal: subtotal,
  });
};

export const setShipping = (state, action) => {
  return updateObject(state, { shipping: action.value });
};

// reducer
export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return updateObject(state, { loading: true });

    case FETCH_PRODUCTS_SUCCESS:
      return updateObject(state, { products: action.products, loading: false });

    case FETCH_PRODUCTS_FAIL:
      return updateObject(state, {
        products: [],
        loading: false,
        error: action.error
      });

    case ADD_PRODUCT_TO_CART:
      return addProductToCart(state, action);

    case REMOVE_PRODUCT_FROM_CART:
      return removeProductFromCart(state, action);

    case UPDATE_PRODUCT_QUANTITY:
      return updateProductQuantity(state, action);

    case INC_PRODUCT_QUANTITY:
      return incProductQuantity(state, action);

    case DEC_PRODUCT_QUANTITY:
      return decProductQuantity(state, action);

    case EMPTY_CART:
      return emptyCart(state, action);

    case CALCULATE_CART:
      return calculateCart(state, action);

    case SET_SHIPPING:
      return setShipping(state, action);

    default:
      return state;
  }
}
