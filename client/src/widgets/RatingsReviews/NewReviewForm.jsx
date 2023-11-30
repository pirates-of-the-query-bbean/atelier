import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './NewReviewForm.module.scss';
import ReviewStars from './ReviewStars';

function NewReviewForm({ currentProduct, onClose }) {
  const [rating, setRating] = useState(0);
  const [productCharacteristics, setProductCharacteristics] = useState({});
  const [reviewCharacteristics, setReviewCharacteristics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleCharacteristicChange = (charId, value) => {
    setReviewCharacteristics((prev) => ({ ...prev, [charId]: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      product_id: currentProduct.id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      characteristics: reviewCharacteristics,
    };

    try {
      const response = await axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', payload, {
        headers: {
          'Authorization': process.env.REACT_APP_API_KEY
        },
      });
      console.log('Review submitted successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    const fetchProductCharacteristics = async () => {
      try {
        const response = await axios
          .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${currentProduct.id}`, {
            headers: {
              'Authorization': process.env.REACT_APP_API_KEY
            },
          });
        setProductCharacteristics(response.data.characteristics);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching characteristics:', error);
      }
    };

    fetchProductCharacteristics();
  }, [currentProduct.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.newReviewForm}>
      <div className={styles.reviewRating}>
        <div>
          <h2>
            Rate this product
          </h2>
        </div>
        <div>
          <ReviewStars setRating={setRating} />
        </div>
      </div>

      <div className={styles.formField}>
        <input
          type="text"
          placeholder="Review Title"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={styles.textInput}
        />
      </div>

      <div className={styles.formField}>
        <textarea
          placeholder="Your Review..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={styles.textInput}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.checkboxLabel}>
          {'Recommend this product?  '}
          <input
            type="checkbox"
            checked={recommend}
            onChange={(e) => setRecommend(e.target.checked)}
            className={styles.checkboxInput}
          />
        </label>
      </div>

      <div className={styles.formField}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.textInput}
        />
      </div>

      <div className={styles.formField}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.textInput}
        />
      </div>

      {Object.entries(productCharacteristics).map(([charName, charDetails]) => (
        <div key={charDetails.id} className={styles.characteristicRating}>
          <p className={styles.characteristicName}>{charName}</p>
          <div className={styles.options}>
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className={styles.optionsLabel}>
                {num}
                <input
                  type="radio"
                  name={`char-${charDetails.id}`}
                  value={num}
                  onChange={(e) => handleCharacteristicChange(charDetails.id, e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
      ))}

      <button type="submit" className={styles.submitButton}>Submit Review</button>
    </form>
  );
}

NewReviewForm.propTypes = {
  currentProduct: PropTypes.shape({
    campus: PropTypes.string,
    category: PropTypes.string,
    created_at: PropTypes.string,
    default_price: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewReviewForm;
