import * as actions from "../constants/action-types";
import { updateObject } from "../utility";


const initialState = {
  cart: [],
  products: [],
  token: null, // authentication
  error: null, // authentication
  loading: false // authentication
};

// AUTH REDUCERS
const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};


// ROOT REDUCER
function rootReducer(state=initialState, action) {
  switch (action.type) {
    case actions.FETCH_PRODUCTS_SUCCESS:
      return updateObject(state, {
        products: action.products
      });
    case actions.ADD_PRODUCT_TO_CART:
      const itemInCart = state.cart.find(e => e.id === action.item.id);
      // check if the item is in the cart already
      if (itemInCart) {
        // if it does, increment quantity of an existing item...
        // TODO: make sure new quantity is <= of available quantity in stock
        itemInCart.quantity += action.quantity;
        // get position of itemInCart in state.cart
        const index = state.cart.findIndex(e => e.id === itemInCart.id);

        // clone cart
        const newCart = JSON.parse(JSON.stringify(state.cart));
        console.log(newCart);
        // and update item at position index with the same object
        // with updated quantity
        // newCart[index] = itemInCart;

        // return { cart: newCart, products: action.products };
      } else {
        // ... if it doesn't, create it
        const newItem = Object.assign({}, action.item);
        newItem.quantity = action.quantity;

        return updateObject(state, {
          cart: state.cart.concat(newItem)
        });
      };
    case actions.REMOVE_PRODUCT_FROM_CART:
      // get all cart items not matching the item being removed
      const result = state.cart.filter(e => e.id !== action.item.id);
      return updateObject(state, {
        cart: result
      });
      // return { cart: result, products: state.products };

    case actions.UPDATE_PRODUCT_QUANTITY:
      const getItem = state.cart.find(e => e.id === action.item.id);
      if (getItem) {
        getItem.quantity = action.quantity;
      }
      // tbc...
      return Object.assign({}, state, {}); // to be implemented

    case actions.EMPTY_CART:
      // empties cart
      return updateObject(state, {
        cart: []
      });
      // return { cart: [], products: state.products };

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

export default rootReducer;
