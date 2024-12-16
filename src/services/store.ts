import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { builderReducer } from './slices/builder/index';
import { feedsReducer } from './slices/feeds/index';
import { ingredientsReducer } from './slices/ingredients/index';
import { ordersReducer } from './slices/orders/index';
import { userReducer } from './slices/user/index';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  user: userReducer,
  creator: builderReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
