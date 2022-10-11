import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import { MyCart } from './MyCart';

describe('MyCart', () => {
  it('should remove an item from cart', async () => {
    renderWithProviders(<MyCart />, {
      preloadedState: {
        cart: {
          cart: [
            {
              id: 457,
              title: 'Matematyka 1. Podręcznik. Zakres podstawowy',
              author: 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
              cover_url: 'http://localhost:3001/static/cover/book/457.jpg',
              pages: 280,
              price: 3200,
              currency: 'PLN',
              quantity: 1,
            },
            {
              id: 905,
              title: 'Nowa Matematyka z plusem 5. Podręcznik',
              author: 'M. Dobrowolska, M. Jucewicz, M. Karpiński, P. Zarzycki',
              cover_url: 'http://localhost:3001/static/cover/book/905.jpg',
              pages: 256,
              price: 2990,
              currency: 'PLN',
              quantity: 1,
            },
          ],
          status: 'idle',
          totalQuantity: 0,
        },
        books: { books: [], status: 'idle' },
      },
    });

    expect(
      screen.getByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Nowa Matematyka z plusem 5. Podręcznik/i)
    ).toBeInTheDocument();

    const [firstButton] = screen.getAllByTestId('delete-book');

    userEvent.click(firstButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(/Nowa Matematyka z plusem 5. Podręcznik/i)
    ).toBeInTheDocument();
  });
  it('should subtract from its quantity instead of removing the item', async () => {
    renderWithProviders(<MyCart />, {
      preloadedState: {
        cart: {
          cart: [
            {
              id: 457,
              title: 'Matematyka 1. Podręcznik. Zakres podstawowy',
              author: 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
              cover_url: 'http://localhost:3001/static/cover/book/457.jpg',
              pages: 280,
              price: 3200,
              currency: 'PLN',
              quantity: 2,
            },
            {
              id: 905,
              title: 'Nowa Matematyka z plusem 5. Podręcznik',
              author: 'M. Dobrowolska, M. Jucewicz, M. Karpiński, P. Zarzycki',
              cover_url: 'http://localhost:3001/static/cover/book/905.jpg',
              pages: 256,
              price: 2990,
              currency: 'PLN',
              quantity: 1,
            },
          ],
          status: 'idle',
          totalQuantity: 0,
        },
        books: { books: [], status: 'idle' },
      },
    });

    expect(
      screen.getByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Nowa Matematyka z plusem 5. Podręcznik/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument();

    const [firstButton] = screen.getAllByTestId('delete-book');

    userEvent.click(firstButton);

    await waitFor(() => {
      expect(screen.queryByText(/Quantity: 2/i)).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Nowa Matematyka z plusem 5. Podręcznik/i)
    ).toBeInTheDocument();
  });
});
