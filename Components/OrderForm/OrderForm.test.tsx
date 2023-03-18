import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import { OrderForm } from './OrderForm';

describe('OrderForm', () => {
  it('should render required error when inputs are empty', async () => {
    renderWithProviders(<OrderForm />);

    const payButton = screen.getByRole('button', { name: 'Pay' });

    userEvent.click(payButton);
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Card number is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Expiration date is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/CVV is required/i)).toBeInTheDocument();
  });

  it('should render invalid email error', async () => {
    renderWithProviders(<OrderForm />);

    const emailInput = screen.getByLabelText(/Email/i);

    await userEvent.type(emailInput, '123456');

    const payButton = screen.getByRole('button', { name: 'Pay' });

    userEvent.click(payButton);

    expect(
      await screen.findByText(/Invalid email address/i)
    ).toBeInTheDocument();
  });
});
