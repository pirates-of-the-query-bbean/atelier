import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewReviewForm = function ({ currentProduct, onClose }) {
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
    setReviewCharacteristics(prev => ({ ...prev, [charId]: parseInt(value) }));
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
    console.log('payload baby!', payload);

    try {
      const response = await axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', payload, {
        headers: {
          'Authorization': process.env.REACT_APP_API_KEY
        },
      });
      console.log('Review submitted successfully:', response.data);
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error appropriately
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
    <form onSubmit={handleSubmit}>
      {[1, 2, 3, 4, 5].map((num) => (
        <label key={num}>
          {num}
          <input type="radio" name="rating" value={num} onChange={() => setRating(num)} />
        </label>
      ))}

      <input type="text" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />

      <textarea placeholder="Review body" value={body} onChange={(e) => setBody(e.target.value)} />

      <label>
        Recommend this product:
        <input type="checkbox" checked={recommend} onChange={(e) => setRecommend(e.target.checked)} />
      </label>

      <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />

      <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />

      {Object.entries(productCharacteristics).map(([charName, charDetails]) => (
        <div key={charDetails.id}>
          <p>{charName}</p>
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
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
      ))}

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default NewReviewForm;
