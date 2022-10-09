import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import booksReducer from '../slices/booksSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: booksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
