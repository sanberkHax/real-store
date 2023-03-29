import { screen } from '@testing-library/react';
import { ProductList } from './ProductList';
import { renderWithProviders } from './../../utils/test-utils';
import { Product } from '@/types/product';

const DUMMY_PRODUCT: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
];

it('should render vertical ProductList correctly', () => {
  renderWithProviders(<ProductList list={DUMMY_PRODUCT} />);
  expect(
    screen.getByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/109.95/i)).toBeInTheDocument();
});
