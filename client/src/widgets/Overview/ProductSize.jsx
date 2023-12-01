import React, { useState, useEffect } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from './ProductSize.module.scss';
import CustomButton from '../../sharedComponents/customButton/CustomButton';

function ProductSize({
  productStyles, addToBag, favorite, setCurrSize, setCurrQty, setSku, sizeFocus, sizeNeeded,
}) {
  const [isDisabled, setDisabled] = useState(true);
  const [isSizeQty, setSizeQty] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const sizeHandler = (e) => {
    const [sku, size] = e.target.value.split(',');
    const qty = productStyles[sku].quantity;
    setSizeQty(qty);
    setDisabled(false);
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
    });
    if (!qty > 0) {
      setIsOutOfStock(true);
    }
  }, []);

  return (
    <div data-testid="product-size" className={styles.container}>
      <div className={`${styles.buttonRow} ${sizeNeeded ? styles.show : null}`}>
        <p>Please Select a Size</p>
        <select ref={sizeFocus} onChange={sizeHandler}>
          <option value="null">{isOutOfStock ? 'OUT OF STOCK' : 'SELECT A SIZE'}</option>
          {Object.keys(productStyles).map((id) => (productStyles[id].quantity === 0 ? null
            : <option key={uuidv4()} value={`${id},${productStyles[id].size}`}>{productStyles[id].size}</option>))}
        </select>
        <select onChange={qtyHandler} disabled={isDisabled}>
          {isDisabled ? <option value="-">-</option> : null}
          { [...Array(isSizeQty)].map((_, i) => (i < 15
            ? <option key={uuidv4()} value={i + 1}>{i + 1}</option> : null))}
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

ProductSize.propTypes = {
  productStyles: PropTypes.shape({
    styleId: PropTypes.shape({
      quantity: PropTypes.number,
      size: PropTypes.string,
    }),
  }).isRequired,
  addToBag: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  setCurrSize: PropTypes.func.isRequired,
  setCurrQty: PropTypes.func.isRequired,
  setSku: PropTypes.func.isRequired,
  sizeFocus: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  sizeNeeded: PropTypes.bool.isRequired,

};

export default ProductSize;
