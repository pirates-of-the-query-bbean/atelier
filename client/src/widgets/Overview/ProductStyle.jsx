import React from "react";
import styles from "./ProductStyle.module.scss";
import FiveStars from "../../sharedComponents/FiveStars.jsx";
import Style from "./Style.jsx";

function ProductStyle({ product, productStyles }) {
  console.log(productStyles.length);
  return (
    <div>
      {productStyles.map((style) => (
        <Style style={style} />
      ))}
    </div>
  );
}

export default ProductStyle;
