// import { combineReducers } from "redux";
// import cartReducer from "./cartReducer";

import { ADD_PRODUCT_TO_CART } from "../constants/action-types";
import { REMOVE_PRODUCT_FROM_CART } from "../constants/action-types";


const initialState = {
  cart: [
    // sample items for testing. This data will be pulled/pushed from/to
    // API on localhost:8000 using axios.
    {
      id: 0,
      name: "Shoe",
      slug: "shoe-shoe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 34.95,
      quantity: 3,
      picture:
        "https://images-na.ssl-images-amazon.com/images/I/61KlTNgPluL._SL1001_.jpg"
    },
    {
      id: 1,
      name: "Shoe2",
      slug: "shoe-shoe2",
      description:
        "Quisque aliquam justo vel enim dignissim, vitae fringilla massa venenatis. Aliquam erat volutpat.",
      price: 20.15,
      quantity: 2,
      picture:
        "https://images-na.ssl-images-amazon.com/images/I/61cbAQatNlL._UY395_.jpg"
    }
  ]
};

function rootReducer(state=initialState, action) {
  if (action.type === ADD_PRODUCT_TO_CART) {
    // instead of .push(), which mutates the initial state, we use .concat()
    // to prevent mutation
    return Object.assign({}, state, {
      cart: state.cart.concat(action.payload)
    });
  }
  if (action.type === REMOVE_PRODUCT_FROM_CART) {
    // instead of .push(), which mutates the initial state, we use .concat()
    // to prevent mutation
    return Object.assign({}, state, {
      cart: state.cart.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
