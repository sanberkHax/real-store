import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../src/utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Checkout } from '../pages/Checkout';

// Intercept network request with msw and return example response
export const handlers = [
  rest.post('http://localhost:3001/api/order', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          status: 'success',
        },
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

describe('Checkout', () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it('should render empty cart warning if cart is empty', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cart: { cart: [], status: 'idle', totalQuantity: 0 },
        books: { books: [], status: 'idle' },
      },
    });
    expect(screen.getByText(/Your Cart Is Empty/i)).toBeInTheDocument();
  });
  it('should render form if cart is not empty', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cart: {
          cart: [
            {
              id: 0,
              title: 'string',
              author: 'string',
              cover_url: 'string',
              pages: 0,
              price: 0,
              currency: 'string',
              quantity: 1,
            },
          ],
          status: 'idle',
          totalQuantity: 0,
        },
        books: { books: [], status: 'idle' },
      },
    });
    expect(screen.queryByText(/Your Cart Is Empty/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });
  it('should make an order', async () => {
    renderWithProviders(<Checkout />, {
      preloadedState: {
        cart: {
          cart: [
            {
              id: 457,
              title: 'string',
              author: 'string',
              cover_url: 'string',
              pages: 0,
              price: 0,
              currency: 'string',
              quantity: 1,
            },
          ],
          status: 'idle',
          totalQuantity: 0,
        },
        books: { books: [], status: 'idle' },
      },
    });

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const cityInput = screen.getByLabelText(/City/i);
    const zipInput = screen.getByLabelText(/Zip Code/i);

    userEvent.type(firstNameInput, 'Sanberk');
    userEvent.type(lastNameInput, 'Turker');
    userEvent.type(cityInput, 'Madrid');
    userEvent.type(zipInput, '12-123');
    userEvent.click(screen.getByText(/I Order and Pay/i));

    await waitFor(() => {
      expect(screen.queryByText(/Checkout/i)).not.toBeInTheDocument();
    });
  });
});
