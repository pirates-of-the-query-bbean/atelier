import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './App.module.scss';
import UpvoteLink from './sharedComponents/upvoteLink/UpvoteLink.jsx';
// import RatingsReviews from './widgets/RatingsReviews/RatingsReviews.jsx';

function App() {

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [productReviews, setProductReviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getProducts();
    getQuestions();
  }, []);

  const getProducts = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: {
        'Authorization': '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'
      }
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
        'Authorization': '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'
      }
    })
    .then((response) => {
      setProductReviews(response.data);
    })
    .catch((err) => {
      console.log('error fetching product reviews', err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const getQuestions = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
      headers: {
        Authorization: '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',
      },
    })
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log('error fetching questions', err);
      });
  };

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      getReviews();
    }
  }, [currentProduct]);

  if (isLoading) {
    return <div>
      Loading...
    </div>
  }
  return (
    <div>
      <h1 data-testid="app-hw" className={styles.ugly}>
        Pirates of the query-bbean
      </h1>
      {/* <RatingsReviews productReviews={productReviews} /> */}
      {/* <UpvoteLink item={questions[0]} itemType="question" property="question_helpfulness" /> */}
    </div>
  );
}

export default App;
