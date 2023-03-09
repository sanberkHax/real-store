import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/pages';
import { renderWithProviders } from '@/utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Intercept network request with msw and return example response
export const handlers = [
  rest.get('http://localhost:3001/api/book', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 457,
            title: 'Matematyka 1. Podręcznik. Zakres podstawowy',
            author: 'M. Karpiński, M. Dobrowolska, M. Braun, J. Lech',
            cover_url: 'http://localhost:3001/static/cover/book/457.jpg',
            pages: 280,
            price: 3200,
            currency: 'PLN',
          },
        ],
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

describe('App', () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it('should render homepage initially', async () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Book Store/i)).toBeInTheDocument();
    expect(screen.getByText(/My Cart/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
      ).toBeInTheDocument();
    });
  });
  it('should add a book to cart', async () => {
    renderWithProviders(<App />);
    const addToCartButton = await screen.findByText(/Add to Cart/i);

    userEvent.click(addToCartButton);

    const myCartButton = screen.getByText(/My Cart/i);

    userEvent.click(myCartButton);

    expect(
      await screen.findByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
    ).toBeInTheDocument();
  });
  it('should update book quantity instead of adding another to cart', async () => {
    renderWithProviders(<App />);
    const addToCartButton = await screen.findByText(/Add to Cart/i);

    userEvent.click(addToCartButton);
    userEvent.click(addToCartButton);

    const myCartButton = screen.getByText(/My Cart/i);

    userEvent.click(myCartButton);

    expect(await screen.findByText(/Quantity: 2/i)).toBeInTheDocument();
  });

  it('should render checkout page after clicking next button', async () => {
    renderWithProviders(<App />, {
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
    const myCartButton = screen.getByText(/My Cart/i);

    userEvent.click(myCartButton);

    const nextButton = await screen.findByText(/Next/i);

    userEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
    });
  });
});
