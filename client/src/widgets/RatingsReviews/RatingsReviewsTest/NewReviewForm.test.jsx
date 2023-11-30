import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import NewReviewForm from '../NewReviewForm';

jest.mock('axios');

describe('NewReviewForm', () => {
  const mockCurrentProduct = { id: '12345' };
  const mockOnClose = jest.fn();

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { characteristics: { Size: { id: 1 }, Comfort: { id: 2 } } }
    });
  });

  it('renders the form without crashing', async () => {
    render(<NewReviewForm currentProduct={mockCurrentProduct} onClose={mockOnClose} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(screen.getByText('Rate this product')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Review Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Review...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit Review' })).toBeInTheDocument();

    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('Comfort')).toBeInTheDocument();
  });
});
