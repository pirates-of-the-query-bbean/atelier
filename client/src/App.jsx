import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './App.module.scss';
// import RatingsReviews from './widgets/RatingsReviews/RatingsReviews.jsx';
import FiveStars from './sharedComponents/FiveStars';
import RelatedProducts from './widgets/RelatedProducts/RelatedProducts';
function App() {

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [productReviews, setProductReviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [relatedItemsStyle, setRelatedItemsStyle] = useState([]); 
  const [relatedItems, setRelatedItems] = useState([]);
  const [relatedItemsID, setRelatedItemsID] = useState([]);

  useEffect(() => {
    getProducts();
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

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      getReviews();
    }
  }, [currentProduct]);

  

  /* ------ Kens Code to be used for development stage ------- */
  // related items ID, sets relatedItemsID, moves with currentItem
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${currentProduct.id}/related`,
      headers: {
        'Authorization': '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'
      },
    };
    axios(options)
      .then((res) => {
        setRelatedItemsID(res.data);
      })
      .catch((err) => console.log("the error with the axios get req is ", err));
  }, [currentProduct]);

  // Function to get the related items ID
  useEffect(
    () => {
      const options = {
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${currentProduct.id}/related`,
        headers: {
          'Authorization': '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'
        },
      };

      axios(options)
        .then((res) => {
          setRelatedItemsID(res.data);
          console.log('data received,', res.data);
        })
        .catch((err) => console.log("the error with the axios get req is", err));
    }, [currentProduct]);


  //fetches relatedItemsInformation
  useEffect(() => {
    const fetchProductInfo = (id) => {
      const options = {
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
        headers: {
          'Authorization': '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'
        },
      };
      return axios(options)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    };

    if (relatedItemsID.length > 0) {
      Promise.all(relatedItemsID.map((id) => fetchProductInfo(id)))
        .then((newList) => {
          setRelatedItems(newList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [relatedItemsID]);

   //styling
  useEffect(() => {
    const fetchProductStyle = (id) => {
      const options = {
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
        headers: {
          'Authorization': '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'
        },
      };
      return axios(options)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    };
    if (relatedItemsID.length > 0) {
      Promise.all(relatedItemsID.map((id) => fetchProductStyle(id)))
        .then((newList) => {
          setRelatedItemsStyle(newList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [relatedItemsID]);


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
      <RelatedProducts
        relatedItemsStyle={relatedItemsStyle}
        currentItem={currentProduct}
        items={relatedItems}
      />

      {/* <RatingsReviews productReviews={productReviews} /> */}
    </div>
  );
}

export default App;
