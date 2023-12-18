export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';


export const addToCart = (product) => {
    return { type: ADD_TO_CART, payload: product };
  };
  export const removeFromCart = (productId) => {
    return { type: REMOVE_FROM_CART, payload: productId };
  };
  export const removeAllProductFromCart = () => {
    return { type: CLEAR_CART };
  };
  export const increaseQuantity = (productId) => {
    return { type: INCREASE_QUANTITY, payload: productId };
  };
  export const decreaseQuantity = (productId) => {
    return { type: DECREASE_QUANTITY, payload: productId };
  };
  