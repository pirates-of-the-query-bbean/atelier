import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductSize from '../ProductSize';

describe('ProductSize Element', () => {
  test('ProductSize renders on page', () => {
    render(<ProductSize
      productStyles={[{
        style_id: 240500,
        name: 'Forest Green & Black',
        original_price: '140.00',
        sale_price: null,
        'default?': true,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          },

        ],
        skus: {
          1394769: {
            quantity: 8,
            size: 'XS',
          },

        },
      }]}
    />);
    expect(screen.getByTestId('product-size')).toBeInTheDocument();
    expect(screen.getByText('SELECT A SIZE', { exact: false })).toBeInTheDocument();
  });
  test('ProductSize renders on page', () => {
    render(<ProductSize
      productStyles={[{
        style_id: 240500,
        name: 'Forest Green & Black',
        original_price: '140.00',
        sale_price: null,
        'default?': true,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          },

        ],
        skus: {
          1394769: {
            quantity: 0,
            size: 'XS',
          },

        },
      }]}
    />);
    expect(screen.getByText('OUT OF STOCK', { exact: false })).toBeInTheDocument();
  });
});
