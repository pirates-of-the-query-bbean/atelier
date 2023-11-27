import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Overview from './Overview';

describe('Overview component exists', () => {
  test('renders Overview.jsx', () => {
    render(<Overview product={{ default_price: 10 }} />);
    const overviewWidget = screen.getByTestId('overview');
    expect(overviewWidget).toBeInTheDocument();
  });
});
