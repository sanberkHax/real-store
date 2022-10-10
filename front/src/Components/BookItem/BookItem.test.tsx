import { render, screen } from '@testing-library/react';
import { BookItem } from './BookItem';

it('should render correctly', () => {
  render(
    <BookItem
      title="Matematyka 1. Podręcznik. Zakres podstawowy"
      author="M. Karpiński, M. Dobrowolska, M. Braun, J. Lech"
      cover="http://localhost:3001/static/cover/book/457.jpg"
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
});
