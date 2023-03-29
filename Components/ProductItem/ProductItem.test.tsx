import { screen } from '@testing-library/react';
import { ProductItem } from './ProductItem';
import { renderWithProviders } from './../../utils/test-utils';

it('should render ProductItem correctly', () => {
  renderWithProviders(
    <ProductItem
      id={1}
      title="Mens Cotton Jacket"
      price={55.99}
      image={'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'}
    />
  );

  expect(screen.getByText(/Mens Cotton Jacket/i)).toBeInTheDocument();
  expect(screen.getByText(/55.99/i)).toBeInTheDocument();
});
