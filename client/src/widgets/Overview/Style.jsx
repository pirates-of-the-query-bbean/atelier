import React from "react";
import styles from "./Style.module.scss";
import CheckIcon from "@mui/icons-material/Check";

function Style({ style, setCurrStyle, selected = false }) {
  return (
    <div
      onClick={() => {
        setCurrStyle(style);
      }}
      className={styles.container}
    >
      <img src={style.photos[0].thumbnail_url}></img>
      {selected ? (
        <div className={styles.check}>
          <CheckIcon />
        </div>
      ) : null}
    </div>
  );
}

export default Style;
