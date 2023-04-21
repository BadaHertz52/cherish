import { useState, useEffect } from 'react';

import { SearchKeywordSection, ItemCard } from '@/components';
import type { Item } from '@/components/ItemCard';

import SearchHeader from './components/SearchHeader';
import styles from './style.module.scss';

const SearchPage = () => {
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [recommendKeywords, setRecommendKeywords] = useState<string[]>([]);
  const [recentProducts, setRecentProducts] = useState<Item[]>([]);

  const handleSearch = (keyword: string) => {
    // TODO: search API
  };

  useEffect(() => {
    // TODO: fetch API
    setRecentKeywords(['졸업식', '엄마', '40대']);
    setRecommendKeywords(['화이트데이', '스몰럭셔리', '가정의 달']);
    setRecentProducts(
      Array.from({ length: 5 }, (_, index) => ({
        id: index,
        company: 'Aesop',
        name: '레저렉션 아로마틱 핸드 밤',
        price: 31000,
        image:
          'https://ichef.bbci.co.uk/news/800/cpsprodpb/E172/production/_126241775_getty_cats.png',
        bookmarked: true,
      })),
    );
  }, []);

  return (
    <div className={styles.searchPage}>
      <SearchHeader handleSearch={handleSearch} />
      <section className={styles.contents}>
        <h2>최근 검색어</h2>
        <SearchKeywordSection items={recentKeywords} handleSearch={handleSearch} />

        <h2>추천 검색어</h2>
        <SearchKeywordSection items={recommendKeywords} handleSearch={handleSearch} />

        <h2>최근 본 상품</h2>
        <div className={styles.productSection}>
          {recentProducts.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
