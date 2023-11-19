import React, {useState} from 'react';
import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';

function Search({handleSubmit}) {
  const [questionsQuery, setQuestionsQuery] = useState('');

  return (
    <form className={styles.questions__searchbar}>
      <input
        type='text'
        onChange={(e) => {
          if (e.target.value.length >= 3) {
            setQuestionsQuery(e.target.value);
          }
        }}
        placeholder='Have a question? Search for answers...' />
        <SearchIcon className={styles.submitSearch} onClick={(e) => handleSubmit(e) }/>
    </form>
  )
}

export default Search;