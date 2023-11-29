import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductStyle from '../ProductStyle';

describe('ProductStyle Element', () => {
  test('ProductStyle renders on page', () => {
    render(<ProductStyle
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
      currStyle={{ name: 'name', style_id: 1 }}
    />);
    expect(screen.getByTestId('product-style')).toBeInTheDocument();
  });
  test('ProductStyle renders on page', () => {
    render(<ProductStyle
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
      currStyle={null}
    />);
    expect(screen.getByText('Select a style', { exact: false })).toBeInTheDocument();
  });
});
