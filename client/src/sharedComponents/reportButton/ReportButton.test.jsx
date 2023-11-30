import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ReportButton from './ReportButton';

const mockReport = jest.fn();

const question = <ReportButton itemType="questions" id="644740" onClick={mockReport} />;
const answer = <ReportButton itemType="answer" id="644740" onClick={mockReport} />;
const review = <ReportButton itemType="questions" id="644740" onClick={mockReport} />;

describe('Report Button', () => {
  test('Button renders, and reports questions', async () => {
    const user = userEvent.setup();
    render(question);
    expect(screen.getByTestId('reportButton')).toBeInTheDocument();

    const button = screen.getByTestId('reportButton');
    await user.click(button);
    expect(mockReport).toHaveBeenCalledTimes(1);
  });
  test('Button renders, and reports answers', async () => {
    const user = userEvent.setup();
    render(answer);
    expect(screen.getByTestId('reportButton')).toBeInTheDocument();

    const button = screen.getByTestId('reportButton');
    await user.click(button);
    expect(mockReport).toHaveBeenCalledTimes(1);
  });
  test('Button renders, and reports reviews', async () => {
    const user = userEvent.setup();
    render(review);
    expect(screen.getByTestId('reportButton')).toBeInTheDocument();

    const button = screen.getByTestId('reportButton');
    await user.click(button);
    expect(mockReport).toHaveBeenCalledTimes(1);
  });
});
