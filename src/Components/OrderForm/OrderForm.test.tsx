import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import { OrderForm } from './OrderForm';
describe('OrderForm', () => {
  it('should work correctly', async () => {
    renderWithProviders(<OrderForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const cityInput = screen.getByLabelText(/City/i);
    const zipInput = screen.getByLabelText(/Zip Code/i);

    await userEvent.type(firstNameInput, 'Sanberk');
    expect(firstNameInput).toHaveValue('Sanberk');

    await userEvent.type(lastNameInput, 'Turker');
    expect(lastNameInput).toHaveValue('Turker');

    await userEvent.type(cityInput, 'Madrid');
    expect(cityInput).toHaveValue('Madrid');

    await userEvent.type(zipInput, '12-123');
    expect(zipInput).toHaveValue('12-123');
  });
});
