import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import AddButton from '../assets/AddButtonImage.png';
import styles2 from './AddOutfitCard.module.scss';

function AddOutfitCard({handleClick}) {
  return (
    <main onClick={() => handleClick()} className={styles2.outfitCard}>
      <div className={styles2.outfitCard__image}>
        <AddCircleOutlineIcon />
      </div>
      <div className={styles2.outfitCard__text}>
        <span>
          Enhance your outfit choices effortlessly with the plus button above.
          As you browse our site's varied selection,
          easily compile your favorite styles for a tailored shopping experience.
        </span>
      </div>
    </main>
  );
}

export default AddOutfitCard;
