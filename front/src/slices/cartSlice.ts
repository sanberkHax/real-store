import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Book } from './booksSlice';

export interface CartState {
  cart: Book[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
  cart: [],
  status: 'idle',
};

interface OrderState {
  order: [];
  first_name: string;
  last_name: string;
  city: string;
  zip_code: string;
}

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (orderData: OrderState) => {
    console.log(orderData);
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = filteredCart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(placeOrder.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addToCart, removeItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
