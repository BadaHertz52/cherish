import { useNavigate } from 'react-router-dom';

import BackButtonSvg from '@/assets/svgs/back-button.svg';
import SearchSvg from '@/assets/svgs/search.svg';

import styles from './style.module.scss';

type SearchHeaderProps = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  handleSearch: (keyword: string) => void;
};

const SearchHeader = ({ handleSearch, keyword, setKeyword }: SearchHeaderProps) => {
  const navigate = useNavigate();

  const handleClickSearch = () => {
    handleSearch(keyword);
  };

  const handleKeywordChange = ({ target }: { target: HTMLInputElement }) => {
    setKeyword(target.value);
  };

  return (
    <>
      <div className={styles.searchHeader}>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
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