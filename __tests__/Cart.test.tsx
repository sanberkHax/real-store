import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import Cart from '@/pages/cart';
import { CartItem } from '@/redux/slices/cartSlice';
import mockRouter from 'next-router-mock';

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

describe('MyCart', () => {
  it('should remove an item from cart', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          cart: DUMMY_CART,
          totalQuantity: 2,
          totalPrice: 165.94,
        },
      },
    });

    expect(
      screen.getByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Mens Cotton Jacket/i)).toBeInTheDocument();

    const [button1] = screen.getAllByTitle(/delete/i);

    userEvent.click(button1);

    waitForElementToBeRemoved(() =>
      screen.queryByText(
        /Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i
      )
    );
    expect(screen.getByText(/Mens Cotton Jacket/i)).toBeInTheDocument();
  });
  it('should display empty state', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          cart: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
      },
    });
  });
  it('should display products', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          cart: DUMMY_CART,
          totalQuantity: 1,
          totalPrice: 109.95,
        },
      },
    });

    expect(
      screen.getByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
    ).toBeInTheDocument();
  });

  it(`should update total price by quantity`, async () => {
    mockRouter.push('/cart');

    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: {
          cart: [
            {
              id: 1,
              title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
              price: 109.95,
              image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
              quantity: 1,
            },
          ],
          totalQuantity: 1,
          totalPrice: 109.95,
        },
      },
    });

    expect(screen.getAllByText(/109.95/i)).toHaveLength(2);

    const input = screen.getByLabelText(/quantity-input/i);

    await userEvent.type(input, '0');
    expect(screen.getAllByText(/1099.50/i)).toHaveLength(1);
  });
});
