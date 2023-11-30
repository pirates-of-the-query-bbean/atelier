import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Overview from './Overview';

describe('Overview component exists', () => {
  test('renders loading state immediately', () => {
    render(<Overview product={{ id: 40344, default_price: '10.00' }} />);
    const loadingOverview = screen.getByTestId('loading-overview');
    expect(loadingOverview).toBeInTheDocument();
  });
  // test('renders widget with correct data provided', async () => {
  //   render(<Overview product={{ id: 40344, default_price: '10.00' }} />);
  //   await waitFor(() => {
  //     expect(screen.getByTestId('overview')).toBeInTheDocument();
  //   });
  // });
  test('renders error state when ivalid id is provided', async () => {
    render(<Overview product={{ id: 123, default_price: '10.00' }} />);
    await waitFor(() => {
      expect(screen.getByTestId('err-overview')).toBeInTheDocument();
    });
  });
});
