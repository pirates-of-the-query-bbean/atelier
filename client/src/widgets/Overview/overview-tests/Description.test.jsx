import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Description from '../Description';

describe('Description Element', () => {
  test('Element renders on page', () => {
    render(<Description
      product={{
        slogan: 'slogan',
        description: 'description',
        features: [{ value: 'value', feature: 'feature' }],
      }}
    />);
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByText('value', { exact: false })).toBeInTheDocument();
  });
});
