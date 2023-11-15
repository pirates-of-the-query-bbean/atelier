import React from 'react';
import FiveStars from './sharedComponents/FiveStars.jsx';

const App = () => {
  const props = 2.5;

  return (
    <div>
      <h1>Hello World!!!!!</h1>

      <FiveStars props={props}/>

    </div>
  )
}

export default App;