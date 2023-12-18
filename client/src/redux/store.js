import { combineReducers, applyMiddleware } from 'redux';
import localStorageMiddleware from './localStorageMiddleware';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
const rootReducer = combineReducers({
  cart: cartReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: [localStorageMiddleware],
});
export default store;
