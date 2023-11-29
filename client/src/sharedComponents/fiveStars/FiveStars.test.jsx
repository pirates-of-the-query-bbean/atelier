import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FiveStars from './FiveStars';

describe('Five Stars Component', () => {
  test('renders Five Stars Component', () => {
    render(<FiveStars rating={4.5} />);
    const starRating = screen.getByTestId('starRating');
    expect(starRating).toBeInTheDocument();
  });
  // test('renders 4.5 stars', () => {
  //   render(<FiveStars rating={4.5} />);
  //   const starRating = screen.getByTestId('starRating');
  //   expect(starRating).toContainHTML('<div class="starRating" data-testid="starRating"><svg aria-hidden="true" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" data-testid="StarIcon" focusable="false" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg><svg aria-hidden="true" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" data-testid="StarIcon" focusable="false" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg><svg aria-hidden="true" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" data-testid="StarIcon" focusable="false" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg><svg aria-hidden="true" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" data-testid="StarIcon" focusable="false" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg><svg aria-hidden="true" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" data-testid="StarHalfIcon" focusable="false" viewBox="0 0 24 24"><path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg></div>');
  // });
});
