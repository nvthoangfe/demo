import { ADD_TO_CART, CLEAR_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_FROM_CART } from "./action";

const localStorageMiddleware = store => next => action => {
    const result = next(action);
    if (
      action.type === ADD_TO_CART ||
      action.type === DECREASE_QUANTITY ||
      action.type === INCREASE_QUANTITY ||
      action.type === REMOVE_FROM_CART ||
      action.type === CLEAR_CART 
    ) {
      const   {cartItems} = store.getState()?.cart;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    return result;
  };
  export default localStorageMiddleware;
  