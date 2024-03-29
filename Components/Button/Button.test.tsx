import { render, screen } from '@testing-library/react';
import { Button } from './Button';

it('should render correctly', () => {
  render(<Button text="Test" />);
  expect(screen.getByText(/test/i)).toBeInTheDocument();
});
