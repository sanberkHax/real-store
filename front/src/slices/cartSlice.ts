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

interface OrderItem {
  id: number;
  quantity: number;
}
interface OrderState {
  order: OrderItem[];
  first_name: string;
  last_name: string;
  city: string;
  zip_code: string;
}

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (orderData: OrderState) => {
    await fetch('http://localhost:3001/api/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
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
      const removedItem = state.cart.find((item) => item.id === action.payload);

      // Remove item from cart when it's quantity is 1, otherwise decrease its quantity
      if (removedItem) {
        if (removedItem?.quantity === 1) {
          const filteredCart = state.cart.filter(
            (item) => item.id !== action.payload
          );
          state.cart = filteredCart;
        } else {
          removedItem.quantity--;
        }
      }
    },
    updateTotalQuantity: (state) => {
      // Make a new array with cart items' quantity values
      const quantities = state.cart.map((cartItem) => cartItem.quantity);

      if (quantities.length > 0) {
        // Calculate total quantity of cart items'
        const calculatedTotalQuantity = quantities.reduce(
          (previousValue, currentValue) => {
            return previousValue + currentValue;
          }
        );

        // Set calculated value as totalQuantity
        state.totalQuantity = calculatedTotalQuantity;
      } else {
        state.totalQuantity = 0;
      }
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

export const selectCartState = (state: RootState) => state.cart;
export const selectCartArray = (state: RootState) => state.cart.cart;
export const selectTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;

export default cartSlice.reducer;
