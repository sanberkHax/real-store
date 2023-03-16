import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type CartState = {
  cart: CartItem[];
  status: 'idle' | 'loading' | 'failed';
  totalQuantity: number;
};

const initialState: CartState = {
  cart: [],
  status: 'idle',
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changePrice: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      // Update product's total price by given quantity
      const matchedProduct = state.cart.find(
        (cartProduct) => cartProduct.id === action.payload.id
      );

      if (matchedProduct) {
        matchedProduct.quantity = action.payload.quantity;

        // let total = matchedProduct.quantity * matchedProduct.price;

        // matchedProduct.total = Number(total.toFixed(2));

        // if (matchedProduct.quantity === 0) {
        // deleteProduct(matchedProduct.id);
        // }
      }
    },
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
    emptyCart: (state) => initialState,
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
});

export const {
  addToCart,
  removeItem,
  updateTotalQuantity,
  changePrice,
  emptyCart,
} = cartSlice.actions;

export const selectCartState = (state: RootState) => state.cart;
export const selectCartArray = (state: RootState) => state.cart.cart;
export const selectTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;

export default cartSlice.reducer;
