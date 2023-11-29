import React, { useState, useEffect } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import AddOutfitCard from './AddOutfitCard/AddOutfitCard';
import ItemContainer from './ItemContainer/ItemContainers';
import styles from './RelatedProducts.module.scss';
import OutfixCard from './OutfitCard/OutfixCard';

function RelatedProducts({currentItem}) {
  useEffect(() => {
    if (currentItem && currentItem.id) {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${currentItem.id}/styles`, {
            headers: {
              Authorization: process.env.REACT_APP_API_KEY,
            },
        })
        .then((res) => {
            const defaultStyle = res.data.results.find(style => style['default?'] === true);
            if (defaultStyle) {
                setCurrentStyle(defaultStyle); 
            } else {
                console.log("No default style found");
            }
        })
        .catch(() => {
            console.log('there was an error');
        });
    }
}, [currentItem]);

  //  currentList state is the list given to us combined with its default styling and price
  const [currentList, setCurrentList] = useState([]);

  //  this state is to keep track of what is currently shown in the screen
  const [shownList, setShownList] = useState([]);

  //  this state is to keep track of when the comparison table is open
  const [openTable, setOpenTable] = useState(false);

  //  might be able to not use this..
  //  this is to keep track of what the 'currentItem' will be compared against
  const [clickedItem, setClickedItem] = useState('');
  const [comparisonTableInfo, setComparisonTableInfo] = useState({}); 
  //  keep track of what the user has added to the outfit list
  const [userOutfitlist, setUserOutfitList] = useState([]);

  const [currentStyle, setCurrentStyle] = useState([]);

  //  combines the list of 'related items' with their default styles and prices
  useEffect(() => {
    if (currentItem && currentItem.id) {
      const fetchRelatedItems = async () => {
        try {
          const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${currentItem.id}/related`, {
            headers: {
              Authorization: process.env.REACT_APP_API_KEY,
            },
          });
          const relatedItemsID = response.data;
          const relatedItemsInfo = await Promise.all(relatedItemsID.map(id => axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
            headers: {
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }).then((res) => res.data)));
          const relatedItemsStyles = await Promise.all(relatedItemsID.map(id => axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, {
            headers: {
               Authorization: process.env.REACT_APP_API_KEY,
            },
          }).then((res) => res.data)));
          const combinedList = relatedItemsInfo.map((item, index) => {
            const defaultStyle = relatedItemsStyles[index].results.find((r) => r['default?']) || relatedItemsStyles[index].results[0];
            return { ...item, style: defaultStyle };
          });
          setCurrentList(combinedList);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRelatedItems();
    }
  }, [currentItem]);

  const handleTableClick = (item) => {
    setClickedItem(item);
    setOpenTable(!openTable);
    compareItems();
  };

  //gets invoked when the item card is clicked, to compare with the main item
  // const compareItems = () => {
  //   const currentItem = new Set(currentItem.features.map(f => f.feature));
  //   const clickedItem = new Set(clickedItem.features.map(f => f.feature));

  //   const sharedFeatures = [];
  //   const uniqueToCurrentItem = [];
  //   const uniqueToClickedItem = [];

  //   product1.features.forEach(f => {
  //     if (product2Features.has(f.feature)) {
  //       sharedFeatures.push(f);
  //     } else {
  //       uniqueToCurrentItem.push(f);
  //     }
  //   });

  //   product2.features.forEach(f => {
  //     if (!product1Features.has(f.feature)) {
  //       uniqueToClickedItem.push(f);
  //     }
  //   });

  //   const result = {
  //     sharedFeatures,
  //     uniqueToCurrentItem,
  //     uniqueToClickedItem
  //   };

  //   setComparisonTableInfo(result); 
  // };

  const handleArrowClick = (value) => {
  };

  const handleAddOutfit = () => {
    if (!userOutfitlist.includes(currentItem)) {
      setUserOutfitList((prev) => [...prev, currentItem]);
    }
  };

  const handleRemoveOutfit = () => {
    if (userOutfitlist.includes(currentItem)) {
      const arrayCopy = [...userOutfitlist];
      const indexOfRemoved = arrayCopy.indexOf(currentItem);
      arrayCopy.splice(indexOfRemoved, 1);
      setUserOutfitList(arrayCopy);
    }
  };

  return (
    <div className={styles.relatedProducts} data-testid="related-products">
      <div className={styles.relatedProducts__container}>
        <span className={styles.relatedProducts__header}>Related Products</span>
        <div className={styles.products__row}>
          <div className={styles.products__arrows}>
            {/* onClick={() => handleArrowClick("left")}  */}
            <div className={styles.products__icon}><KeyboardArrowLeftIcon/></div>
            <div className={styles.products__icon}><KeyboardArrowRightIcon/></div>
          </div>
          {currentList.map((product) => (
            <ItemContainer
              dataTestId="itemCardContainers"
              handleClick={handleTableClick}
              key={product.id}
              item={product}
              Icon={StarOutlineIcon}
            />
          ))}
        </div>
      </div>
     
      {/* <div style={{ display: openTable ? "flex": "none"}} className={styles.comparisonTable}>
        <div className={styles.comparisonTable__firstRow}>
          <span>{currentItem.name}</span>
          <span>Comparing</span>
          <span>{clickedItem.name}</span>
          <span>Fabric</span>
          <span>Canvas</span>
          <span>Sole</span>
          <span>Rubber</span>
          <span>Stitching</span>
          <span>Double Stitch</span>
        </div>
        
      </div>  */}

      <div>
        <span className={styles.relatedProducts__header}>Your Outfit</span>
        <div className={styles.userOutfit__row}>
          <AddOutfitCard handleClick={handleAddOutfit} />
          {(userOutfitlist.length > 0)
            ? userOutfitlist.map((product) => (
              //  TODO two
              <OutfixCard
                datatestid="newOutfitCard"
                handleClick={handleRemoveOutfit}
                key={product.id}
                item={product}
                Icon={CloseIcon}
                currentStyle={currentStyle}
                
              />
            )) : ''}
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;
