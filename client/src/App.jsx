import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './App.module.scss';
import RatingsReviews from './widgets/RatingsReviews/RatingsReviews';
import Questions from './widgets/Questions';
import RelatedProducts from './widgets/RelatedProducts/RelatedProducts';
import Overview from './widgets/Overview';

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [productReviews, setProductReviews] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getProducts = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setProducts(response.data);
        // set current product to first product in array
        setCurrentProduct(response.data[0]);
      })
      .catch((err) => {
        console.log('error fetching products', err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  function getAverageRating(reviews) {
    let reviewTotal = 0;
    for (let i = 0; i < reviews.length; i += 1) {
      reviewTotal += reviews[i].rating;
    }
    setAverageRating(reviewTotal / reviews.length);
  }

  const getReviews = () => {
    setIsLoading(true);
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${currentProduct.id}`, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setProductReviews(response.data);
        getAverageRating(response.data.results);
      })
      .catch((err) => {
        console.log('error fetching product reviews', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      getReviews();
    }
  }, [currentProduct]);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav>ADD HEADER HERE</nav>
      {Object.keys(currentProduct).length > 0 && <Overview product={currentProduct} />}
      <RelatedProducts currentItem={currentProduct} />
      <Questions currentProduct={currentProduct} />
      <RatingsReviews
        productReviews={productReviews}
        currentProduct={currentProduct}
        averageRating={averageRating}
      />
    </div>
  );
}

export default App;
