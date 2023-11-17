import React, {useState} from 'react';
import styles from './Overview.module.scss';
import FiveStars from '../sharedComponents/FiveStars.jsx';
import ProductTitle from './Overview/ProductTitle.jsx';
import ProductStyle from './Overview/ProductStyle.jsx';
import ProductSize from './Overview/ProductSize.jsx';
import Description from './Overview/Description.jsx';
import Gallery from './Overview/Gallery.jsx';

function Overview({product}) {
  const [currPrice, setCurrPrice] = useState(product.default_price)

  return (
    <section>
      <h1 data-testid="app-hw" className={styles.ugly}>Overview</h1>
      <div className={styles.galleryAndAside}>
      <Gallery/>
      <aside>
       <ProductTitle product={product} price={currPrice}/>
       <ProductStyle product={product}/>
       <ProductSize product={product}/>
      </aside>
      </div>

      <Description product={product}/>


    </section>
  );
}

export default Overview;
