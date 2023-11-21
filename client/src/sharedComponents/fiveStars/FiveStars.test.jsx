import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FiveStars from './FiveStars';

describe('App component', () => {
  test('renders app.jsx', () => {
    render(<FiveStars />);
    const appElement = screen.getByTestId('app-hw');
    expect(appElement).toBeInTheDocument();
  });
});
