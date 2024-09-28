import {ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY} from '../types';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        item => item.product._id === action.payload.product._id,
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product._id === action.payload.product._id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product._id !== action.payload,
        ),
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product._id === action.payload.productId
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
