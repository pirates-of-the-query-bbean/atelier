import React from "react";
import styles from "./App.module.scss";
import FiveStars from "./sharedComponents/FiveStars.jsx";
import Overview from "./widgets/Overview.jsx";

function App() {
  const sampleProduct = {
    id: 40345,
    campus: "hr-rfp",
    name: "Bright Future Sunglasses",
    slogan: "You've got to wear shades",
    description:
      "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    category: "Accessories",
    default_price: "69.00",
    created_at: "2021-08-13T14:38:44.509Z",
    updated_at: "2021-08-13T14:38:44.509Z",
    features: [
      {
        feature: "Lenses",
        value: "Ultrasheen",
      },
      {
        feature: "UV Protection",
        value: null,
      },
      {
        feature: "Frames",
        value: "LightCompose",
      },
    ],
  };

  return (
    <div>
      <h1 data-testid="app-hw" className={styles.ugly}>
        Pirates of the query-bbean 2
      </h1>
      <Overview product={sampleProduct} />
    </div>
  );
}

export default App;
