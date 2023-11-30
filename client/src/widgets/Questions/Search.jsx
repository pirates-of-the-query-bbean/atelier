import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Search.module.scss';

function Search({ handleSearch, setQuestionsQuery }) {
  return (
    <form className={styles.questions__searchbar}>
      <input
        type="text"
        onChange={(e) => {
          if (e.target.value.length >= 3) {
            setQuestionsQuery(e.target.value);
          }
        }}
        placeholder="Have a question? Search for answers..."
      />
      <SearchIcon className={styles.submitSearch} onClick={(e) => handleSearch(e)} />
    </form>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  setQuestionsQuery: PropTypes.func.isRequired,
};

export default Search;
