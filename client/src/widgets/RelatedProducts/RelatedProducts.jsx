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
  
  const getAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length > 0 ? totalRating / reviews.length : null;
  };

  //  currentList state is the list given to us combined with its default styling and price
  const [currentList, setCurrentList] = useState([]);
  const [shownList, setShownList] = useState([]);
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344`, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((res) => {
        console.log(res.data, 'itemwithfeature');
        setCurrentItemWithFeature(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentItem]);

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
  
      const relatedItemsReviews = await Promise.all(relatedItemsID.map(id => axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}`, {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      }).then((res) => getAverageRating(res.data.results))));
  
      const combinedList = relatedItemsInfo.map((item, index) => {
        const defaultStyle = relatedItemsStyles[index].results.find((r) => r['default?']) || relatedItemsStyles[index].results[0];
        const averageRating = relatedItemsReviews[index];
        return { ...item, style: defaultStyle, averageRating };
      });
  
      console.log('this is the currentlist', combinedList);
      setCurrentList(combinedList);
      setShownList(combinedList.slice(0, 4));
      setRightList(combinedList.slice(4));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentItem && currentItem.id) {
      fetchRelatedItems();
    }
  }, [currentItem]);



  const handleRightArrowClick = () => {
    if (rightList.length > 0) {
      console.log("this is the current shownList", shownList);
      console.log("this is the current leftList", leftList);
      console.log("this is the current rightList", rightList);

      let rightListCopy = [...rightList];
      let shownListCopy = [...shownList];
      let leftListCopy = [...leftList];
      let removedValue;

      removedValue = shownListCopy.shift();
      leftListCopy.push(removedValue);

      removedValue = rightListCopy.shift();
      shownListCopy.push(removedValue);

      setShownList(shownListCopy);
      setLeftList(leftListCopy);
      setRightList(rightListCopy);

      console.log("this is the new shownList", shownList); 
      console.log("this is the new leftList", leftList); 
      console.log("this is the new rightList", rightList); 
    }
  }

  const handleLeftArrowClick = () => {
    if (leftList.length > 0) {
      console.log("this is the current shownList", shownList);
      console.log("this is the current leftList", leftList);
      console.log("this is the current rightList", rightList);

      let rightListCopy = [...rightList];
      let shownListCopy = [...shownList];
      let leftListCopy = [...leftList];
      let removedValue;

      removedValue = leftListCopy.pop();
      shownListCopy.unshift(removedValue);

      removedValue = shownListCopy.pop();
      rightListCopy.unshift(removedValue);

      setShownList(shownListCopy);
      setLeftList(leftListCopy);
      setRightList(rightListCopy);

      console.log("this is the new shownList", shownList); 
      console.log("this is the new leftList", leftList); 
      console.log("this is the new rightList", rightList); 
    }
  }


  //  this state is to keep track of when the comparison table is open
  const [openTable, setOpenTable] = useState(false);
  //  might be able to not use this..
  //  this is to keep track of what the 'currentItem' will be compared against
  const [clickedItem, setClickedItem] = useState({});
  const [comparisonTableInfo, setComparisonTableInfo] = useState([]);
  //  keep track of what the user has added to the outfit list
  const [userOutfitlist, setUserOutfitList] = useState([]);
  const [currentStyle, setCurrentStyle] = useState([]);
  const [currentItemWithFeature, setCurrentItemWithFeature] = useState({}); 
  const [comparisonData, setComparisonData] = useState({});

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
          console.log('this is the currentlist', combinedList);
          setCurrentList(combinedList);
          setShownList(combinedList.slice(0, 4));
          setRightList(combinedList.slice(4));
        } catch (error) {
          console.log(error);
        }
      };
      fetchRelatedItems();
    }
  }, [currentItem]);



  
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

  const handleTableClick = (item) => {
    console.log('this is the current item', currentItem);
    console.log('this is the object being received in the function', item); 
    setClickedItem(item);
    setOpenTable(!openTable);
    compareItems();
  };

  const compareItems = () => {
    if (!currentItemWithFeature || !clickedItem || !currentItemWithFeature.features || !clickedItem.features) {
      console.log('this is the currentItemWithFeature', currentItemWithFeature); 
      console.log('this is the clickedItem', clickedItem); 

      console.log("Items or features are not present");
      return; // Exit if items or their features are not present
    }
  
    let combinedFeatures = {};
    
    // Process currentItemWithFeature features
    currentItemWithFeature.features.forEach(f => {
      combinedFeatures[f.feature] = { currentItemWithFeatureValue: f.value };
    });
  
    // Process clickedItem features
    clickedItem.features.forEach(f => {
      if (combinedFeatures[f.feature]) {
        combinedFeatures[f.feature].clickedItemValue = f.value;
      } else {
        combinedFeatures[f.feature] = { clickedItemValue: f.value };
      }
    });
  
    // Fill missing values with '-'
    Object.keys(combinedFeatures).forEach(feature => {
      combinedFeatures[feature] = {
        currentItemWithFeatureValue: combinedFeatures[feature].currentItemWithFeatureValue || '-',
        clickedItemValue: combinedFeatures[feature].clickedItemValue || '-'
      };
    });
    setComparisonTableInfo(combinedFeatures);
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
              <div style={{ display: (leftList.length === 0) ? 'none' : 'initial'}} onClick={handleLeftArrowClick} className={styles.products__iconleft}><KeyboardArrowLeftIcon/></div>
              <div style={{ display: (rightList.length === 0) ? 'none' : 'initial'}} onClick={handleRightArrowClick} className={styles.products__iconright}><KeyboardArrowRightIcon/></div>
          </div>
          {shownList.map((product) => (
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
     
      <div style={{ display: openTable ? "flex" : "none" }} className={styles.comparisonTable}>
        <div className={styles.comparisonTable__firstRow}>
           <div className={styles.comparisonTable__header}>
              <span>Comparing</span>
           </div> 

           <div className={styles.comparisonTable__items}>
            <span>{currentItem.name}</span>
            <span>{clickedItem.name}</span>
           </div>
        </div>
        {Object.entries(comparisonTableInfo).map(([feature, values]) => (
          <div key={feature} className={styles.comparisonTableRows}>
            <span>{values.currentItemWithFeatureValue || "-"}</span>
            <span>{feature}</span>
            <span>{values.clickedItemValue || "-"}</span>
          </div>
        ))}
      </div>
      <div>
        <span className={styles.relatedProducts__header}>Your Outfit</span>
        <div className={styles.userOutfit__row}>
          <AddOutfitCard handleClick={handleAddOutfit} />
          {(userOutfitlist.length > 0)
            ? userOutfitlist.map((product) => (
              
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




// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40350/related 
// [
//     40344,
//     40345,
//     40346,
//     40347,
//     40348,
//     40349,
//     40350,
//     40351,
//     40352
// ]