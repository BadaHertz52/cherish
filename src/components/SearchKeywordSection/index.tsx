import styles from './style.module.scss';

export type SearchKeywordSectionProps = {
  items: string[];
};

const SearchKeywordSection = ({ items }: SearchKeywordSectionProps) => {
  return (
    <div className={styles.searchKeywordSection}>
      <section className={styles.tags}>
        {items.map(item => (
          <div className={styles.tag}>{item}</div>
        ))}
      </section>
    </div>
  );
};

export default SearchKeywordSection;
