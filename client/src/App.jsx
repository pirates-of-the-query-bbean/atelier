import React from "react";
import styles from "./App.module.scss";
import FiveStars from "./sharedComponents/FiveStars.jsx";
import Overview from "./widgets/Overview.jsx";

function App() {
  const sampleProduct = {
    id: 40344,
    campus: "hr-rfp",
    name: "Camo Onesie",
    slogan: "Blend in to your crowd",
    description:
      "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    category: "Jackets",
    default_price: "140.00",
    created_at: "2021-08-13T14:38:44.509Z",
    updated_at: "2021-08-13T14:38:44.509Z",
    features: [
      {
        feature: "Fabric",
        value: "Canvas",
      },
      {
        feature: "Buttons",
        value: "Brass",
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
