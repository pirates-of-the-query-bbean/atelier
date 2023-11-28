import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Overview.module.scss';
import ProductTitle from './Overview/ProductTitle';
import ProductStyle from './Overview/ProductStyle';
import ProductSize from './Overview/ProductSize';
import Description from './Overview/Description';
import Gallery from './Overview/Gallery';

function Overview({ product, reviews }) {
  const [currPrice, setCurrPrice] = useState({
    sale_price: null,
    original_price: product.default_price,
  });
  const [currSize, setCurrSize] = useState(null);
  const [currQty, setCurrQty] = useState(1);
  const [currStyle, setCurrStyle] = useState(null);
  const [productStyles, setProductStyles] = useState([]);
  const [isSku, setSku] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getStyles = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/styles`, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setProductStyles(response.data);
        response.data.results.forEach((productStyle) => {
          if (productStyle['default?'] === true) {
            setCurrStyle(productStyle);
          }
        });
      }).then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log('error fetching styles', err);
        setLoading('error');
      });
  };

  const updateStyle = (style) => {
    setCurrStyle(style);
    setCurrPrice({
      sale_price: style.sale_price,
      original_price: style.original_price,
    });
  };

  const addToBag = () => {
    console.log('ADDING TO BAG');
    console.log({
      product_id: product.id,
      size: currSize,
      qty: currQty,
      style: currStyle.style_id,
      price: currPrice,
      sku: isSku,
    });
  };

  const favorite = () => {
    console.log('Favorite', product.id);
  };

  useEffect(() => {
    getStyles();
  }, []);

  if (isLoading === true) {
    return <h3>Loading...</h3>;
  }

  if (isLoading === 'error') {
    return <h3>ERROR fetching content!</h3>;
  }

  return (
    <section data-testid="overview" className={styles.container}>
      <div className={styles.galleryAndAside}>
        <div className={styles.gallery}>
          <Gallery currStyle={currStyle} />
        </div>
        <aside>
          <ProductTitle reviews={reviews} product={product} price={currPrice} />
          <ProductStyle
            product={product}
            productStyles={productStyles.results}
            currStyle={currStyle}
            setCurrStyle={updateStyle}
          />
          <ProductSize
            productStyles={currStyle.skus}
            addToBag={addToBag}
            favorite={favorite}
            setCurrSize={setCurrSize}
            setCurrQty={setCurrQty}
            setSku={setSku}
          />
        </aside>
      </div>

      <Description product={product} />
    </section>
  );
}
export default Overview;
