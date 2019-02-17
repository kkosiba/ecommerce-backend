import { updateObject } from "../utility";

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
  return updateObject(state, {
    cart: result
  });
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

  return updateObject(state, {
    cart: cartCopy
  });
};

export const decProductQuantity = (state, action) => {
  const cartCopy = JSON.parse(JSON.stringify(state.cart));
  const item = cartCopy.find(e => e.id === action.item.id);
  item.quantity -= 1;
  if (item.quantity === 0) {
    // add condition: item.quantity !== ""
    return removeProductFromCart(state, action);
  } else {
    return updateObject(state, {
      cart: cartCopy
    });
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
  return updateObject(state, {
    cart: cartCopy
  });
};

export const emptyCart = (state, action) => {
  return updateObject(state, { cart: [] });
};

export const fetchProducts = (state, action) => {
  return updateObject(state, { products: action.products });
};
