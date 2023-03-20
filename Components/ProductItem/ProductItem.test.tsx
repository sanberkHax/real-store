import { screen } from '@testing-library/react';
import { ProductItem } from './ProductItem';
import { renderWithProviders } from './../../utils/test-utils';

it('should render ProductItem correctly', () => {
  renderWithProviders(
    <ProductItem id={1} title={'title'} price={'10'} image={''} />
  );
  expect(screen.getByText(/title/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();
});
