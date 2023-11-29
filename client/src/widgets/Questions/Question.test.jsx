import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Question from './Question';

const currentProduct = {
  id: 40345,
  campus: 'hr-rfp',
  name: 'Bright Future Sunglasses',
  slogan: "You've got to wear shades",
  description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
  category: 'Accessories',
  default_price: '69.00',
  created_at: '2021-08-13T14:38:44.509Z',
  updated_at: '2021-08-13T14:38:44.509Z',
};
const question = {
  question_id: 37,
  question_body: 'Why is this product cheaper here than other sites?',
  question_date: '2018-10-18T00:00:00.000Z',
  asker_name: 'williamsmith',
  question_helpfulness: 4,
  reported: false,
  answers: {
    68: {
      id: 68,
      body: 'We are selling it here without any markup from the middleman!',
      date: '2018-08-18T00:00:00.000Z',
      answerer_name: 'Seller',
      helpfulness: 4,
      photos: [],
    },
  },
};

describe('Question Component', () => {
  test('should render question properly', () => {
    render(
      <Question
        currentProduct={currentProduct}
        key={question.question_id}
        question={question}
      />,
    );

    const displayQuestion = screen.getById('question');
    expect(displayQuestion).toBeInTheDocument();
  });
});
