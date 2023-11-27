import React, { useState, useEffect } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import AddOutfitCard from './AddOutfitCard/AddOutfitCard.jsx';
import ItemContainer from './ItemContainer/ItemContainers';
import styles from './RelatedProducts.module.scss';

function RelatedProducts({items, currentItem, relatedItemsStyle}) {
  //  currentList state is the list given to us combined with its default styling and price
  const [currentList, setCurrentList] = useState([]);

  //  this state is to keep track of what is currently shown in the screen
  const [shownList, setShownList] = useState([]);

  //  this state is to keep track of when the comparison table is open
  const [openTable, setOpenTable] = useState(false);

  //  might be able to not use this..
  //  this is to keep track of what the 'currentItem' will be compared against
  const [clickedItem, setClickedItem] = useState('');

  //  keep track of what the user has added to the outfit list
  const [userOutfitlist, setUserOutfitList] = useState([]);

  //  combines the list of 'related items' with their default styles and prices
  useEffect(() => {
    if (items && relatedItemsStyle) {
      const combineBothList = items.map((item) => {
        const styleObj = relatedItemsStyle.find(style => style.product_id === String(item.id));
        const defaultStyle = styleObj ? styleObj.results.find(r => r['default?'] === true) : null;
        return { ...item, style: defaultStyle };
      });
      setCurrentList(combineBothList);
    }
  }, [items, relatedItemsStyle]);

  const handleTableClick = (item) => {
    setClickedItem(item);
    setOpenTable(!openTable);
  };

  const handleArrowClick = (value) => {
  };

  const handleAddOutfit = () => {
    setUserOutfitList((prev) => [...prev, currentItem]);
  };

  const handleRemoveOutfit = (item) => {
    //  TODO 1
    //  TODO copy userOutfitlist
    //  TODO remove specific 'item'
    //  TODO then set to userOutfitlist
  };

  return (
    <div className={styles.relatedProducts} data-testid="related-products">
      <div className={styles.relatedProducts__container}>
        <span className={styles.relatedProducts__header}>Related Products</span>
        <div className={styles.products__row}>
          <div className={styles.products__arrows}>
            <div onClick={() => handleArrowClick("left")} className={styles.products__icon}><KeyboardArrowLeftIcon/></div>
            <div className={styles.products__icon}><KeyboardArrowRightIcon/></div>
          </div>
          {/* //TODO 3 /}
          {/* //TODO when card is clicked display the table */}
          {currentList.map((product) => (
            <ItemContainer
              handleClick={handleTableClick}
              key={product.id}
              item={product}
              Icon={StarOutlineIcon}
            />
          ))}
        </div>
      </div>
      {/* //TODO 4* /}
      {/* //TODO set up the table* /}
      {/* <div style={{display: 'none'}}className='comparisonTable'>
            <div className='comparisonTable__row-one'>
                <span>Comparing</span>
                <div>
                  <span>{currentItem.name}</span>
                  <span>{clickedItem.name}</span>
                </div>
            </div>
            <div className='comparisonTable__row-two'>
            </div>
      </div> */}

      <div>
        <span className={styles.relatedProducts__header}>Your Outfit</span>
        <div className={styles.userOutfit__row}>
          <AddOutfitCard handleClick={handleAddOutfit} />
          {(userOutfitlist.length > 0)
            ? userOutfitlist.map((product) => (
              //  TODO two
              //TODO change function that we're giving as a prop into its proper function 
              <ItemContainer
                handleClick={handleTableClick}
                key={product.id}
                item={product}
                Icon={CloseIcon}
              />
            )) : ''}
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;