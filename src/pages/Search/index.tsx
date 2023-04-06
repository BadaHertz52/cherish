import styles from './style.module.scss';
import { SearchKeywordSection, SearchHeader, ItemCard } from '@/components';

const SearchPage = () => {
  return (
    <div className={styles.searchPage}>
      <SearchHeader />
      <section className={styles.contents}>
        <h2>최근 검색어</h2>
        <SearchKeywordSection items={['졸업식', '엄마', '40대']} />

        <h2>추천 검색어</h2>
        <SearchKeywordSection items={['화이트데이', '스몰럭셔리', '가정의 달']} />

        <h2>최근 본 상품</h2>
        <div className={styles.productSection}>
          <ItemCard
            id={1}
            company="Aesop"
            name="레저렉션 아로마틱 핸드 밤"
            price={31000}
            image="https://ichef.bbci.co.uk/news/800/cpsprodpb/E172/production/_126241775_getty_cats.png"
            bookmarked={true}
          />
          <ItemCard
            id={1}
            company="Aesop"
            name="레저렉션 아로마틱 핸드 밤"
            price={31000}
            image="https://ichef.bbci.co.uk/news/800/cpsprodpb/E172/production/_126241775_getty_cats.png"
            bookmarked={true}
          />
          <ItemCard
            id={1}
            company="Aesop"
            name="레저렉션 아로마틱 핸드 밤"
            price={31000}
            image="https://ichef.bbci.co.uk/news/800/cpsprodpb/E172/production/_126241775_getty_cats.png"
            bookmarked={true}
          />
          <ItemCard
            id={1}
            company="Aesop"
            name="레저렉션 아로마틱 핸드 밤"
            price={31000}
            image="https://ichef.bbci.co.uk/news/800/cpsprodpb/E172/production/_126241775_getty_cats.png"
            bookmarked={true}
          />
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
