import React, { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import styles from './ProductSize.module.scss';
import CustomButton from '../../sharedComponents/customButton/CustomButton';

function ProductSize({
  productStyles, addToBag, favorite, setCurrSize, setCurrQty, setSku,
}) {
  console.log('Styles', productStyles);
  const [isDisabled, setDisabled] = useState(true);
  const [isSizeQty, setSizeQty] = useState(null);

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

  return (
    <div className={styles.container}>
      <div className={styles.buttonRow}>
        <select onChange={sizeHandler}>
          <option value="null">Select A Size</option>
          {Object.keys(productStyles).map((id, i) => (
            <option key={i} value={`${id},${productStyles[id].size}`}>{productStyles[id].size}</option>))}
        </select>
        <select onChange={qtyHandler} disabled={isDisabled}>
          {isSizeQty === null ? <option value="-">-</option> : null}
          {isSizeQty === 0 ? <option value="null">Out of Stock</option> : null}
          { [...Array(isSizeQty)].map((_, i) => (
            <option value={i + 1}>{i + 1}</option>))}
        </select>
      </div>
      <div className={styles.buttonRow}>
        <div onClick={addToBag} className={styles.addToBag}>
          <CustomButton text="ADD TO BAG" Icon={AddIcon} />
        </div>
        <div onClick={favorite} className={styles.addToBag}>
          <CustomButton className={styles.favorite} Icon={StarBorderIcon} />
        </div>
      </div>
    </div>
  );
}

export default ProductSize;
