import { screen } from '@testing-library/react';
import { ProductList } from './ProductList';
import { renderWithProviders } from './../../utils/test-utils';

it('should render vertical ProductList correctly', () => {
  renderWithProviders(
    <ProductList
      list={[
        {
          createdAt: '01.01.2023',
          id: 1,
          title: 'title',
          image: '',
          category: 'clothing',
          description: '',
          price: '10',
        },
      ]}
    />
  );
  expect(screen.getByText(/title/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
});
