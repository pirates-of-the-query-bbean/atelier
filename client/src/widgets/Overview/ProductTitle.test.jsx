import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductTitle from './ProductTitle';

describe('ProductTitle Renders', () => {
  test('Element exists on page', () => {
    render(<ProductTitle
      product={{
        category: 'clothing',
        name: 'Buddy',
      }}
      price={{
        sale_price: null,
        original_price: '10.00',
      }}
    />);
    const titleComp = screen.getByTestId('product-title');
    expect(titleComp).toBeInTheDocument();
  });
});
