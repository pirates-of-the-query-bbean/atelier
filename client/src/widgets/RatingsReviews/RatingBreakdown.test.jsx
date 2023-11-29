import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingBreakdown from './RatingBreakdown';

describe('RatingBreakdown', () => {
  const mockProductReviews = {
    results: [
      { rating: 5, recommend: true },
      { rating: 4, recommend: false },
      { rating: 5, recommend: true },
      { rating: 2, recommend: false },
      { rating: 2, recommend: false },
      { rating: 3, recommend: false },
    ],
  };
  const mockAverageRating = 4.5;

  it('renders the component', () => {
    render(<RatingBreakdown
      productReviews={mockProductReviews}
      averageRating={mockAverageRating}
    />);
    const ratingBreakdownElement = screen.getByTestId('ratingBreakdown');
    expect(ratingBreakdownElement).toBeInTheDocument();
  });

  it('renders the average rating', () => {
    render(
      <RatingBreakdown
        productReviews={mockProductReviews}
        averageRating={mockAverageRating}
      />,
    );
    expect(screen.getByText(mockAverageRating)).toBeInTheDocument();
  });

  it('calculates and displays the correct recommend percentage', () => {
    render(
      <RatingBreakdown
        productReviews={mockProductReviews}
        averageRating={mockAverageRating}
      />,
    );
    const recommendCount = mockProductReviews.results.filter((review) => review.recommend).length;
    const recommendPercentage = Math.round(
      (recommendCount / mockProductReviews.results.length) * 100,
    );
    expect(screen.getByText(`${recommendPercentage}% of reviews recommend this product`)).toBeInTheDocument();
  });

  // it('displays the correct rating percentages for each star', () => {
  //   render(
  //     <RatingBreakdown
  //       productReviews={mockProductReviews}
  //       averageRating={mockAverageRating}
  //     />,
  //   );
  // });

  it('handles no reviews', () => {
    render(
      <RatingBreakdown
        productReviews={{ results: [] }}
        averageRating={0}
      />,
    );
    expect(screen.getByText('0% of reviews recommend this product')).toBeInTheDocument();
  });

  it('handles all reviews recommending the product', () => {
    const allRecommendReviews = {
      results: [
        { rating: 5, recommend: true },
        { rating: 4, recommend: true },
      ],
    };
    render(
      <RatingBreakdown
        productReviews={allRecommendReviews}
        averageRating={5}
      />,
    );
    expect(screen.getByText('100% of reviews recommend this product')).toBeInTheDocument();
  });
});
