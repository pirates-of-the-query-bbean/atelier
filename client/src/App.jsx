import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './App.module.scss';
import RatingsReviews from './widgets/RatingsReviews/RatingsReviews';
import UpvoteLink from './sharedComponents/upvoteLink/UpvoteLink';
import FiveStars from './sharedComponents/fiveStars/FiveStars';
import Questions from './widgets/Questions';
import Overview from './widgets/Overview';

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [productReviews, setProductReviews] = useState({});
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
        //set current product to first product in array
        setCurrentProduct(response.data[0]);
      })
    .catch((err) => {
      console.log('error fetching products', err);
    })
  }

  const getReviews = () => {
    setIsLoading(true);
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${currentProduct.id}`, {
      headers: {
        'Authorization': process.env.REACT_APP_API_KEY
      },
    })
      .then((response) => {
        setProductReviews(response.data);
      })
      .catch((err) => {
        console.log('error fetching product reviews', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getQuestions = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${currentProduct.id}`, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((err) => {
        console.log('error fetching questions', err);
      });
  };

  useEffect(() => {
    getProducts();
    getQuestions();
  }, []);

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
    <div>
      <h1 data-testid="app-hw" className={styles.ugly}>
        Pirates of the query-bbean 2
      </h1>
      {/* <RatingsReviews productReviews={productReviews} /> */}

      {/* <Overview product={currentProduct} /> */}
      <Questions currentProduct={currentProduct} questions={questions}/>
      {/* <RatingsReviews
        productReviews={productReviews}
        currentProduct={currentProduct}
      /> */}
    </div>
  );
}

export default App;
