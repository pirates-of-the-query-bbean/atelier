import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ProductBreakdown from '../ProductBreakdown';

//mock axios
jest.mock('axios');

//mock product data
const mockProductData = {
  characteristics: {
    Comfort: { id: 1, value: '4.0000' },
  },
};

describe('ProductBreakdown', () => {
  it('fetches and displays product data', async () => {
    //mock axios response
    axios.get.mockResolvedValue({ data: mockProductData });

    //render component
    const { getByText } = render(<ProductBreakdown currentProduct={{ id: '12345' }} />);

    //wait for the component to update based on the mock API call
    await waitFor(() => {
      //check if the component rendered the expected content
      expect(getByText('Comfort')).toBeInTheDocument();
    });
  });
});
