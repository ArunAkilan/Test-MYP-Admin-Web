//import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Dashboard/Dashboard';

// Mock MUI Modal to inline render children with a test id
jest.mock('@mui/material/Modal', () => (props:any) =>
  props.open ? <div data-testid="mock-modal">{props.children}</div> : null
);

// Mock your GenericButton component (adjust path if your folder structure is different)
jest.mock('../components/Common/Button/button', () => (props:any) => (
  <button onClick={props.onClick} className={props.className}>
    {props.label}
  </button>
));

// Mock Dashboardtab component to simplify output
jest.mock('../components/Common/HorizondalTab/Dashboardtab', () => () => <div>DashboardTabMock</div>);

// Mock axios get call to resolve test data immediately
jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: {
          residential: [{}],
          commercial: [],
          plots: [],
        },
      },
    })
  ),
}));

describe('Dashboard Add New Property Button', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders Add New Property button and opens modal on click', async () => {
    render(
      <BrowserRouter>
        <Home properties="all" />
      </BrowserRouter>
    );

    // Advance the 2-second skeleton loading delay inside Dashboard component
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    const addButton = await screen.findByRole('button', { name: /Add New Property/i });
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(await screen.findByTestId('mock-modal')).toBeInTheDocument();
  });
});
