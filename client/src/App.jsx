import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './App.module.scss';
import RatingsReviews from './widgets/RatingsReviews/RatingsReviews';
import Questions from './widgets/Questions';
import RelatedProducts from './widgets/RelatedProducts/RelatedProducts';
import Overview from './widgets/Overview';
import ReportButton from './sharedComponents/reportButton/ReportButton';
import Navbar from './widgets/Navbar/Navbar';

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [productReviews, setProductReviews] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const changeProductsFunc = (newProduct) => {
    console.log('change product to', newProduct);
    setProducts(newProduct);
    setCurrentProduct(newProduct);
  };

  const getProducts = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setProducts(response.data);
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
    let average = reviewTotal / reviews.length;
    average = Math.round(average * 4) / 4;
    setAverageRating(parseFloat(average.toFixed(2)));
  }

  const getReviews = () => {
    setIsLoading(true);
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${currentProduct.id}&count=1000`, {
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
    getProducts();
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
    <div className={styles.container}>
      {/* <nav>ADD HEADER HERE</nav> */}
      <Navbar />
      {Object.keys(currentProduct).length > 0 && (
      <Overview
        product={currentProduct}
        averageRating={averageRating}
        reviewCount={productReviews.count}
      />
      )}
      <RelatedProducts changeProductsFunc={changeProductsFunc} currentItem={currentProduct} />
     
      <Questions currentProduct={currentProduct} />
      <RatingsReviews
        productReviews={productReviews}
        currentProduct={currentProduct}
        averageRating={averageRating}
        setProductReviews={setProductReviews}
      />
    </div>
  );
}

export default App;
