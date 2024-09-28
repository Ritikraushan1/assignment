import {ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY} from '../types';

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity: 1,
    },
  };
};

export const removeFromCart = productId => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateQuantity = (productId, quantity) => {
  return {
    type: UPDATE_QUANTITY,
    payload: {
      productId,
      quantity,
    },
  };
};
