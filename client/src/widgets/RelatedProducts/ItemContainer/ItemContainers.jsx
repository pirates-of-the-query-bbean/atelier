import React from 'react';
import style1 from './ItemContainer.module.scss';
import mainCard from '../assets/noimageavai.png';

function ItemContainer({item, handleClick, Icon}) {
  return (
    <main onClick={() => handleClick(item)} className={style1.itemContainer}>
      <div className={style1.itemContainer__image}>
        {item.style && item.style.photos && item.style.photos.length > 0 && item.style.photos[0].url
          ? <img src={item.style.photos[0].url} alt={item.name} />
          : <img src={mainCard} alt={item.name} />}
        <div className={style1.itemContainer__icon}><Icon/></div>
      </div>
      <div className={style1.itemContainer__text}>
        <span>{item.category}</span>
        <span className={style1.itemContainer__text-name}>{item.name}</span>
        <span>
          $
          {item.default_price}
        </span>
        <div className={style1.itemContainer__ratings}>

        </div>
      </div>
    </main>
  );
}

export default ItemContainer;
