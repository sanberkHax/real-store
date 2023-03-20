import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Checkout from '@/pages/checkout';
import { CartItem } from '@/redux/slices/cartSlice';

const DUMMY_CART: CartItem[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    quantity: 1,
  },
  {
    id: 2,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    quantity: 1,
  },
];

describe('Checkout', () => {
  it('should render empty cart warning if cart is empty', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cart: {
          cart: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
      },
    });
    expect(screen.getByText(/Your Cart Is Empty/i)).toBeInTheDocument();
  });
  it('should render form if cart is not empty', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cart: {
          cart: DUMMY_CART,
          totalQuantity: 2,
          totalPrice: 165.94,
        },
      },
    });
    expect(screen.queryByText(/Your Cart Is Empty/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Pay/i)).toBeInTheDocument();
  });
  it('should make an order', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cart: {
          cart: DUMMY_CART,
          totalQuantity: 2,
          totalPrice: 165.94,
        },
      },
    });

    const autoFillButton = screen.getByText(/Click to auto-fill test values/i);
    const payButton = screen.getByText(/Pay/i);

    await userEvent.click(autoFillButton);
    await userEvent.click(payButton);

    waitFor(async () =>
      expect(await screen.findByText(/Order Succesful!/i)).toBeInTheDocument()
    );
    screen.debug();
  });
});
