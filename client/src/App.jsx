import React from 'react';
import styles from './App.module.scss';
import Questions from './Questions.jsx';

function App() {
  return (
    <div>
      <h1 data-testid="app-hw" className={styles.ugly}>Pirates of the query-bbean</h1>
      <Questions />
    </div>
  );
}

export default App;
