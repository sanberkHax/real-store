import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetail from '@/pages/product/[id]';
import { renderWithProviders } from '@/utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Product } from '@/types/product';

const DUMMY_PRODUCT: Product = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
};

// Intercept network request with msw and return example response
export const handlers = [
  rest.get('https://fakestoreapi.com/products/1', (req, res, ctx) => {
    return res(
      ctx.json({
        data: DUMMY_PRODUCT,
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

describe('ProductDetail', () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it('should render product detail', async () => {
    renderWithProviders(<ProductDetail product={DUMMY_PRODUCT} />);

    expect(
      await screen.findByText(
        /Your perfect pack for everyday use and walks in the forest/i
      )
    ).toBeInTheDocument();
  });
  it(`should add product to cart and update the quantity if it's added multiple times`, async () => {
    renderWithProviders(<ProductDetail product={DUMMY_PRODUCT} />);

    const addToCartButton = await screen.findByText(/Add to Cart/i);

    userEvent.click(addToCartButton);
    userEvent.click(addToCartButton);

    expect(await screen.findByText(/2/i)).toBeInTheDocument();
  });
});
