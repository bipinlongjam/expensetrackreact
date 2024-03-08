import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from './SignIn';
import { loginUser } from '../../store/authsignIn';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

test('should sign in successfully', async () => {
  const navigateMock = jest.fn();
  require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

  const { getByLabelText, getByText } = render(<SignIn />);
  const emailInput = getByLabelText('Email:');
  const passwordInput = getByLabelText('Password:');
  const signInButton = getByText('Sign In');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(signInButton);

  await waitFor(() => {
    expect(loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
