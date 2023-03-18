import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import { FormInput } from './FormInput';

describe('FormInput', () => {
  it('should work correctly', async () => {
    renderWithProviders(<FormInput name="email" label="Email" />);

    const emailInput = screen.getByLabelText('Email');

    await userEvent.type(emailInput, 'test@test.com');

    expect(emailInput).toHaveValue('test@test.com');
  });
});
