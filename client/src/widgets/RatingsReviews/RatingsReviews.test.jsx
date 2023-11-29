import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingsReviews from './RatingsReviews';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';
import RRList from './RRList';

jest.mock('./RatingBreakdown');
jest.mock('./ProductBreakdown');
jest.mock('./RRList');

describe('RatingsReviews', () => {
  const mockProductReviews = { count: 5, results: [] };
  const mockCurrentProduct = { id: '12345' };
  const mockAverageRating = 4.5;

  beforeEach(() => {
    //resetting and setting return values for each mock
    RatingBreakdown.mockClear();
    ProductBreakdown.mockClear();
    RRList.mockClear();

    RatingBreakdown.mockReturnValue(<div>Mock Rating Breakdown</div>);
    ProductBreakdown.mockReturnValue(<div>Mock Product Breakdown</div>);
    RRList.mockReturnValue(<div>Mock RRList</div>);
  });

  it('renders RatingBreakdown, ProductBreakdown, and RRList components', () => {
    render(
      <RatingsReviews
        productReviews={mockProductReviews}
        currentProduct={mockCurrentProduct}
        averageRating={mockAverageRating}
      />,
    );

    expect(screen.getByText('Mock Rating Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Mock Product Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Mock RRList')).toBeInTheDocument();
  });
});
