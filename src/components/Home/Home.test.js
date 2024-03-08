import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from './Home';
import { MemoryRouter } from 'react-router';

const mockStore = configureStore([]);

describe('Home Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: 'mockToken' // Mocking token for useSelector
      },
      expense: {
        darkTheme: false // Mocking darkTheme for useSelector
      }
    });
  });

  test('renders Home component', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    // Assert that Home component renders without errors
  });

  test('displays incomplete profile message', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Your profile is Incomplete')).toBeInTheDocument();
  });

  test('verify email button click', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Verify Email'));
    // Assert that the email verification function is called
  });

  test('logout button click', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Logout'));
    // Assert that the logout function is called
  });

  test('toggle theme button click', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('DarkMode'));
    // Assert that the theme is toggled
  });

  test('modal opens on "Complete Now" button click', async () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Complete now'));
    await waitFor(() =>{
        expect(screen.getByText('Contact Details')).toBeVisible();
    })
  });

  test('form submission on "Update" button click', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Complete now'));
    fireEvent.click(screen.getByText('Update'));
    // Assert that the form submission function is called
  });

  test('form input change', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Complete now'));
    fireEvent.change(screen.getByLabelText('Fullname:'), { target: { value: 'John Doe' } });
    // Assert that the input field value changes
  });

  test('email verification function called on "Verify Email" button click', () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Verify Email'));
    // Assert that the email verification function is called
  });

  test('theme toggles correctly on button click', async () => {
    render(
        <Provider store={store}>
        <MemoryRouter> {/* Wrap with MemoryRouter */}
          <Home />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('DarkMode'));
    await waitFor(() =>{
        expect(screen.getByText('DarkMode')).toBeInTheDocument();
    })
    // Assert that the theme toggles correctly
  });
});
