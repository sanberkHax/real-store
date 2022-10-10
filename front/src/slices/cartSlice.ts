import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface CartItem {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: number;
  price: number;
  currency: string;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  status: 'idle' | 'loading' | 'failed';
  totalQuantity: number;
}

const initialState: CartState = {
  cart: [],
  status: 'idle',
  totalQuantity: 0,
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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Check if item already exists in cart
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      // If it exists, increment its quantity instead
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        // If it doesn't, add item to cart
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = filteredCart;
    },
    updateTotalQuantity: (state) => {
      // Make a new array with cart items' quantity values
      const quantities = state.cart.map((cartItem) => cartItem.quantity);

      // Calculate total quantity of cart items'
      const calculatedTotalQuantity = quantities.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue;
        }
      );

      // Set calculated value as totalQuantity
      state.totalQuantity = calculatedTotalQuantity;
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

export const { addToCart, removeItem, updateTotalQuantity } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
