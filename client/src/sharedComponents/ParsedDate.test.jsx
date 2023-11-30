import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ParsedDate from './ParsedDate';

describe('ParseDate component', () => {
  test('It should parse date prop to Month DD, YYYY format', () => {
    render(<ParsedDate date="2023-08-23T00:00:00.000Z" />);
    const displayDate = screen.getByText('August 22, 2023');
    expect(displayDate).toBeInTheDocument();
  });
});
