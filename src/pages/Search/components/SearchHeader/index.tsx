import { useState } from 'react';

import BackButtonSvg from '@/assets/svgs/back-button.svg';
import SearchSvg from '@/assets/svgs/search.svg';

import styles from './style.module.scss';

type SearchHeaderProps = {
  handleSearch: (keyword: string) => void;
};

const SearchHeader = ({ handleSearch }: SearchHeaderProps) => {
  const [keyword, setKeyword] = useState('');

  const handleClickSearch = () => {
    handleSearch(keyword);
  };

  const handleKeywordChange = ({ target }: { target: HTMLInputElement }) => {
    setKeyword(target.value);
  };

  return (
    <>
      <div className={styles.searchHeader}>
        <div className={styles.backButton}>
          <BackButtonSvg />
        </div>
        <div className={styles.inputBox}>
          <input
            placeholder="검색어를 입력해주세요"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <div className={styles.searchButton} onClick={handleClickSearch}>
            <SearchSvg />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
