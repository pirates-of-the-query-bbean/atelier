import React from 'react';
import style1 from '../ItemContainer/ItemContainer.module.scss'

import mainCard from '../assets/noimageavai.png';


function OutfixCard({item, handleClick, Icon, dataTestId, currentStyle}) {
  return (
    <main data-testid={dataTestId} onClick={() => handleClick(item)} className={style1.itemContainer}>
      <div className={style1.itemContainer__image}>
      <img src={currentStyle && currentStyle.photos && currentStyle.photos[0] ? currentStyle.photos[0].thumbnail_url : mainCard} alt={item.name} />
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

export default OutfixCard;
