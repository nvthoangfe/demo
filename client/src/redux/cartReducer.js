import { ADD_TO_CART, CLEAR_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_FROM_CART } from "./action";
const savedCartItems = localStorage.getItem('cartItems');
const initialState = {
  cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProduct = state.cartItems.find(item => item._id === action.payload._id);
      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map(item => {
            if (item._id === action.payload._id) {
              return { ...item, Quantity: item.Quantity + 1 };
            }
            return item;
          })
        };
      } else {
        const newProduct = { ...action.payload, Quantity: 1 };
        return {
          ...state,
          cartItems: [...state.cartItems, newProduct]
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item._id === action.payload) {
            return { ...item, Quantity: item.Quantity + 1 };
          }
          return item;
        }),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.reduce((acc, item) => {
          if (item._id === action.payload) {
            if (item.Quantity === 1) {
              return acc;
            }
            return [...acc, { ...item, Quantity: item.Quantity - 1 }];
          }
          return [...acc, item];
        }, []),
      };

    default:
      return state;
  }
};
export default cartReducer;
