import styles from './style.module.scss';

export type SearchKeywordSectionProps = {
  items: string[];
  handleSearch: (keyword: string) => void;
};

const SearchKeywordSection = ({ items, handleSearch }: SearchKeywordSectionProps) => {
  return (
    <div className={styles.searchKeywordSection}>
      <section className={styles.tags}>
        {items.map(item => (
          <div className={styles.tag} key={item} onClick={() => handleSearch(item)}>
            {item}
          </div>
        ))}
      </section>
    </div>
  );
};

export default SearchKeywordSection;
