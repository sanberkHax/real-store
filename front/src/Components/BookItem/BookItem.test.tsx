import { screen } from '@testing-library/react';
import { BookItem } from './BookItem';
import { renderWithProviders } from './../../utils/test-utils';

it('should render vertical bookItem correctly', () => {
  renderWithProviders(
    <BookItem
      type="vertical"
      id={1}
      title="Matematyka 1. Podręcznik. Zakres podstawowy"
      author="M. Karpiński, M. Dobrowolska, M. Braun, J. Lech"
      cover_url="http://localhost:3001/static/cover/book/457.jpg"
      pages={280}
      currency="PLN"
      price={3200}
    />
  );
  expect(
    screen.getByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/M. Karpiński, M. Dobrowolska, M. Braun, J. Lech/i)
  ).toBeInTheDocument();
  expect(
    screen.getByAltText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/280 Pages/i)).toBeInTheDocument();
  expect(screen.getByText(/3200 PLN/i)).toBeInTheDocument();
  expect(screen.queryByText(/Quantity/i)).not.toBeInTheDocument();
});

it('should render horizontal bookItem correctly', () => {
  renderWithProviders(
    <BookItem
      type="horizontal"
      id={1}
      title="Matematyka 1. Podręcznik. Zakres podstawowy"
      author="M. Karpiński, M. Dobrowolska, M. Braun, J. Lech"
      cover_url="http://localhost:3001/static/cover/book/457.jpg"
      pages={280}
      currency="PLN"
      quantity={3}
      price={3200}
    />
  );
  expect(
    screen.getByText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/M. Karpiński, M. Dobrowolska, M. Braun, J. Lech/i)
  ).toBeInTheDocument();
  expect(
    screen.getByAltText(/Matematyka 1. Podręcznik. Zakres podstawowy/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/280 Pages/i)).toBeInTheDocument();
  expect(screen.getByText(/3200 PLN/i)).toBeInTheDocument();
  expect(screen.getByText(/Quantity: 3/i)).toBeInTheDocument();
});
