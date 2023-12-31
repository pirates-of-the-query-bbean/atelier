import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import RelatedProducts from './widgets/RelatedProducts/RelatedProducts';

describe('App component', () => {
  test('renders app.jsx', () => {
    render(<App />);
    const appElement = screen.getByTestId('app-hw');
    expect(appElement).toBeInTheDocument();
  });
});


    const relatedProductsElement = screen.getByTestId('related-products');
    expect(relatedProductsElement).toBeInTheDocument();
  });
});
