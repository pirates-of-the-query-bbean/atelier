import React, { useState, useEffect } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import styles from './ProductSize.module.scss';
import CustomButton from '../../sharedComponents/customButton/CustomButton';

function ProductSize({
  productStyles, addToBag, favorite, setCurrSize, setCurrQty, setSku, sizeFocus, sizeNeeded,
}) {
  console.log(productStyles);
  const [isDisabled, setDisabled] = useState(true);
  const [isSizeQty, setSizeQty] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const sizeHandler = (e) => {
    const [sku, size] = e.target.value.split(',');
    const qty = productStyles[sku].quantity;
    setSizeQty(qty);
    if (qty > 0) {
      setDisabled(false);
    }
    setCurrSize(size);
    setSku(Number(sku));
  };

  const qtyHandler = (e) => {
    setCurrQty(Number(e.target.value));
  };

  useEffect(() => {
    let qty = 0;
    Object.keys(productStyles).forEach((style) => {
      qty += productStyles[style].quantity;
      console.log('qty', qty, 'style', style);
    });
    if (!qty > 0) {
      setIsOutOfStock(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.buttonRow} ${sizeNeeded ? styles.show : null}`}>
        <p>Please Select a Size</p>
        <select ref={sizeFocus} onChange={sizeHandler}>
          <option value="null">{isOutOfStock ? 'OUT OF STOCK' : 'SELECT A SIZE'}</option>
          {Object.keys(productStyles).map((id, i) => (productStyles[id].quantity === 0 ? null
            : <option key={i} value={`${id},${productStyles[id].size}`}>{productStyles[id].size}</option>))}
        </select>
        <select onChange={qtyHandler} disabled={isDisabled}>
          {isDisabled ? <option value="-">-</option> : null}
          { [...Array(isSizeQty)].map((_, i) => (i < 15
            ? <option value={i + 1}>{i + 1}</option> : null))}
        </select>
      </div>
      <div className={styles.buttonRow}>
        <div className={styles.addToBag}>
          <CustomButton isDisabled={isOutOfStock} onClickFunction={addToBag} text="ADD TO CART" Icon={AddIcon} />
        </div>
        <div className={styles.favorite}>
          <CustomButton onClickFunction={favorite} Icon={StarBorderIcon} />
        </div>
      </div>
    </div>
  );
}

export default ProductSize;
