import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login/Login';

test('renders Sign in to your account text', () => {
  render(
    <BrowserRouter><Login /></BrowserRouter>
  );
  expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
});

test('submit button is clickable', () => {
  render(
    <BrowserRouter><Login /></BrowserRouter>
  );

  // Find the submit button
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  expect(submitButton).toBeInTheDocument();

  // Fire click event on the button
  fireEvent.click(submitButton);

});
