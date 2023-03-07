import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import booksReducer from './slices/booksSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  books: booksReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: booksReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
