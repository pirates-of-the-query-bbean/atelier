import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Answer from '../Answer';

const testAnswer = {
  id: 68,
  body: 'We are selling it here without any markup from the middleman!',
  date: '2018-08-18T00:00:00.000Z',
  answerer_name: 'Seller',
  helpfulness: 4,
  photos: [],
};

const helpful = jest.fn();
const report = jest.fn();

describe('Answer Component', () => {
  test('renders Answer Component', () => {
    render(<Answer answer={testAnswer} helpful={helpful} report={report} />);
    const answer = screen.getByTestId('answer');
    expect(answer).toBeInTheDocument();
  });
});
