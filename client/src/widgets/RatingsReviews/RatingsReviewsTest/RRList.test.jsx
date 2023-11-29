import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RRList from '../RRList';

describe('RRList', () => {
  it('renders without crashing', () => {
    const mockProductReviews = {
      results: [
        { id: 1, content: 'Review 1' },
        { id: 2, content: 'Review 2' },
      ],
    };
    const mockCurrentProduct = { id: '12345' };

    render(<RRList productReviews={mockProductReviews} currentProduct={mockCurrentProduct} />);
    expect(screen.getByText('Review 1')).toBeInTheDocument();
  });
});
