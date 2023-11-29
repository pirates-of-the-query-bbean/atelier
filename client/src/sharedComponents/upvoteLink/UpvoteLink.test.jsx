import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpvoteLink from './UpvoteLink';

describe('Upvote Link', () => {
  const answerItem = {
    id: 73,
    body: 'Last of the seams started splitting the first time I wore it!',
    date: '2019-11-28T00:00:00.000Z',
    answerer_name: 'sillyguy',
    helpfulness: 15,
    photos: [],
  };

  test('renders Upvote Link', () => {
    render(<UpvoteLink item={answerItem} itemType="answer" property="helpfulness" />);
    const upvote = screen.getByTestId('upvoteLink');
    expect(upvote).toBeInTheDocument();
  });

  // test('handles click event', () => {
  //   const onClick = jest.fn();
  //   const { getByText } = render(
  //     <UpvoteLink item={answerItem} itemType="answer" property="helpfulness" onClick={onClick} />,
  //   );
  //   fireEvent.click(getByTestId('upvoteLink'));
  //   expect(onClick).toHaveBeenCalled();
  // });

  // test('Upvotes Answer', () => {
  //   const onClick = jest.fn();
  //   const { getByTestId } = render(
  //     <UpvoteLink item={answerItem} itemType="answer" property="helpfulness" onClick={onClick} />,
  //   );
  //   fireEvent.click(getByTestId('upvoteLink'));
  //   expect(answerItem.helpfulness).toBe(17);
  // });
});
