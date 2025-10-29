//import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login/Login';
import axios from 'axios';

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //snapshot rendering starts here
test('matches snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

//snapshot rendering end here


  test('renders Sign in to your account text', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  });

  test('submit button is clickable and calls API with form data', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in form inputs
    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), {
      target: { value: '9600664910' },
    });
    fireEvent.change(screen.getByPlaceholderText(/OTP/i), {
      target: { value: 'ST202503' },
    });

    // Mock successful API response
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'fake_token',
        profile: { name: 'Nerenjana', phone: '9600664910' },
      },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for axios.post to be called with correct arguments
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/profile/verify'),
        // 'http://13.203.171.5:3001/api/profile/verify',   (changed this line  to string containing)
        {
          otp: 'ST202503',
          phone: '9600664910',
        }
      );
    });

    // Check that navigate was called to "/dashboard"
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('shows alert on failed login', async () => {
    // Mock alert
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText(/OTP/i), {
      target: { value: 'wrong_otp' },
    });

    // Mock failed API response with error
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid OTP' } },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid OTP');
    });
  });

});
