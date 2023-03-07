import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import { Header } from '@/Components/Header';

describe('Header', () => {
  it('should render correct cart item numbers', async () => {
    renderWithProviders(<Header />, {
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
              quantity: 4,
            },
          ],
          status: 'idle',
          totalQuantity: 4,
        },
        books: { books: [], status: 'idle' },
      },
    });
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });
});
