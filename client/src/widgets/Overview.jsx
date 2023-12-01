import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Overview.module.scss';
import ProductTitle from './Overview/ProductTitle';
import ProductStyle from './Overview/ProductStyle';
import ProductSize from './Overview/ProductSize';
import Description from './Overview/Description';
import Gallery from './Overview/Gallery';

function Overview({ product, averageRating, reviewCount }) {
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
  const sizeFocus = useRef(null);
  const [sizeNeeded, setSizeNeeded] = useState(false);

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
        console.log('error fetching styles', err, '');
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
    if (currSize === null) {
      sizeFocus.current.focus();
      setSizeNeeded(true);
    } else {
      console.log('ADDING TO BAG');
      console.log({
        product_id: product.id,
        size: currSize,
        qty: currQty,
        style: currStyle.style_id,
        price: currPrice,
        sku: isSku,
      });
    }
  };

  const favorite = () => {
    console.log('Favorite', product.id);
  };

  useEffect(() => {
    getStyles();
  }, []);

  if (isLoading === true) {
    return <h3 data-testid="loading-overview">Loading...</h3>;
  }

  if (isLoading === 'error') {
    return <h3 data-testid="err-overview">ERROR fetching content!</h3>;
  }

  return (
    <section data-testid="overview" className={styles.container}>
      <div className={styles.galleryAndAside}>
        <div className={styles.gallery}>
          <Gallery
            currStyle={currStyle}
          />
        </div>
        <aside>
          <ProductTitle
            averageRating={averageRating}
            reviewCount={reviewCount}
            product={product}
            price={currPrice}
          />
          <ProductStyle
            product={product}
            productStyles={productStyles.results}
            currStyle={currStyle}
            setCurrStyle={updateStyle}
          />
          <ProductSize
            sizeNeeded={sizeNeeded}
            sizeFocus={sizeFocus}
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

Overview.defaultProps = {
  averageRating: 0,
  reviewCount: 0,
};

Overview.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    default_price: PropTypes.string,
  }).isRequired,
  averageRating: PropTypes.number,
  reviewCount: PropTypes.number,
};

export default Overview;
