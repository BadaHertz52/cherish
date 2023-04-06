import styles from './style.module.scss';
import BackButtonSvg from '@/assets/svgs/back-button.svg';
import SearchSvg from '@/assets/svgs/search.svg';

const SearchHeader = () => {
  return (
    <>
      <div className={styles.searchHeader}>
        <div className={styles.backButton}>
          <BackButtonSvg />
        </div>
        <div className={styles.inputBox}>
          <input placeholder="검색어를 입력해주세요" />
          <div className={styles.searchButton}>
            <SearchSvg />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
