import { combineReducers } from '@reduxjs/toolkit';
import  categoryReducer  from './categoryReducer';
import userReducer from './userReducer';
import  productReducer  from './productReducer';
import  singleProductReducer  from './singleProductReducer';
import  reviewsReducer  from './reviewsReducer';
import  orderReducer  from './orderReducer';
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  category: categoryReducer,
  products: productReducer,
  user: userReducer,
  product: singleProductReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
  orders: orderReducer
});

export default rootReducer;
