import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import mockRouter from 'next-router-mock';
import { CartItem } from '@/redux/slices/cartSlice';

const DUMMY_CART: CartItem[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    quantity: 1,
  },
];

describe('Header', () => {
  it('should render cart button if the cart is empty', () => {
    mockRouter.push('/cart');

    renderWithProviders(<></>, {
      preloadedState: {
        cart: {
          cart: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
      },
    });
    expect(screen.getByTitle(/Cart/i)).toBeInTheDocument();
  });
  it('should render checkout button and total price if there is a product in cart', () => {
    mockRouter.push('/cart');

    renderWithProviders(<></>, {
      preloadedState: {
        cart: {
          cart: DUMMY_CART,
          totalQuantity: 1,
          totalPrice: 109.95,
        },
      },
    });
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/109.95/i)).toBeInTheDocument();
  });
});
