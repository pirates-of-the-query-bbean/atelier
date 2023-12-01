import React from 'react';
import style1 from './ItemContainer.module.scss';
import mainCard from '../assets/noimageavai.png';
import FiveStars from '../../../sharedComponents/fiveStars/FiveStars';

function ItemContainer({item, handleClick, Icon, dataTestId, changeProductsFunc}) {
  return (
    // onClick={() => changeProductsFunc(item)}
    <main data-testid={dataTestId} className={style1.itemContainer}>
        
      <div className={style1.itemContainer__image} onClick={changeProductsFunc}>
        {item.style && item.style.photos && item.style.photos.length > 0 && item.style.photos[0].thumbnail_url
          ? <img src={item.style.photos[0].thumbnail_url} alt={item.name} />
          : <img src={mainCard} alt={item.name} />}
        <div onClick={() => {handleClick(item); }} className={style1.itemContainer__icon}><Icon/></div>
      </div>
      <div className={style1.itemContainer__text}>
        <span>{item.category}</span>
        <span className={style1.itemContainer__text-name}>{item.name}</span>
        <span>
          $
          {item.default_price}
        </span>
       <FiveStars rating={item.averageRating}/>
        <div className={style1.itemContainer__ratings}>

        </div>
      </div>
    </main>
  );
}

export default ItemContainer;
