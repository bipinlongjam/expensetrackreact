// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import { BrowserRouter as Router } from 'react-router-dom';
// import ForgotPass from './ForgotPass';

// describe('ForgotPass', () => {
//   test('should send password reset email when form is submitted', async () => {
//     // Mock fetch function
//     global.fetch = jest.fn().mockResolvedValue({
//       ok: true,
//     });

//     const { getByPlaceholderText, getByText } = render(
//       <Router>
//         <ForgotPass />
//       </Router>
//     );

//     // Fill email input
//     const emailInput = getByPlaceholderText('Enter your email');
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

//     // Submit form
//     fireEvent.submit(getByText('Send Link'));

//     // Check if fetch function was called with the correct arguments
//     expect(fetch).toHaveBeenCalledWith(expect.stringContaining('sendOobCode'), {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: 'test@example.com',
//         requestType: 'PASSWORD_RESET',
//       }),
//     });

//     // Check if success message is displayed
//     await waitFor(() => {
//         expect(getByText('Password reset email send successfully')).toBeInTheDocument();
//       }, { timeout: 3000 }); // Increase timeout to 3000ms (3 seconds)
//     });

//   test('should display error message if failed to send password reset email', async () => {
//     // Mock fetch function to simulate failure
//     global.fetch = jest.fn().mockResolvedValue({
//       ok: false,
//     });

//     const { getByPlaceholderText, getByText } = render(
//       <Router>
//         <ForgotPass />
//       </Router>
//     );

//     // Fill email input
//     const emailInput = getByPlaceholderText('Enter your email');
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

//     // Submit form
//     fireEvent.submit(getByText('Send Link'));

//     // Check if error message is displayed
//     // await waitFor(() => {
//     //   expect(getByText('Error sending password reset email')).toBeInTheDocument();
//     // });
//   });
// });

import React from 'react';
import { render } from '@testing-library/react';
import ForgotPass from './ForgotPass'; // Make sure to import the ForgotPass component from its correct path
import '@testing-library/jest-dom/extend-expect'; // Extend expect with Jest DOM


describe('ForgotPass', () => {
  test('should render initial text correctly', () => {
    const { getByText } = render(<ForgotPass />);
    const initialText = getByText('Enter the email which you have registered');
    expect(initialText).toBeInTheDocument();
  });
});
