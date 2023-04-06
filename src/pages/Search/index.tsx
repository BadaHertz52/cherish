import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { SearchKeywordSection, SearchHeader, ItemCard } from '@/components';
import FilterDropdownSvg from '@/assets/svgs/filter-dropdown.svg';
import type { Item } from '@/components/ItemCard';

const SearchPage = () => {
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [recommendKeywords, setRecommendKeywords] = useState<string[]>([]);
  const [recentProducts, setRecentProducts] = useState<Item[]>([]);

  const [isSearch, setIsSearch] = useState(true);

  const handleSearch = (keyword: string) => {
    // TODO: search API
    setIsSearch(true);
  };

  const filters = [
    { type: '상품유형', value: ['식품', '뷰티', '리빙/주방', '디지털가전', '의류/잡화', '기타'] },
    { type: '성별', value: ['식품', '뷰티', '리빙/주방', '디지털가전', '의류/잡화', '기타'] },
    { type: '직업', value: ['식품', '뷰티', '리빙/주방', '디지털가전', '의류/잡화', '기타'] },
    { type: '상황', value: ['식품', '뷰티', '리빙/주방', '디지털가전', '의류/잡화', '기타'] },
  ];

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
        {!isSearch ? (
          <>
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
          </>
        ) : (
          <>
            <div className={styles.filters}>
              {filters.map(filter => (
                <div className={styles.filter}>
                  <span>{filter.type}</span>
                  <FilterDropdownSvg />
                </div>
              ))}
            </div>
            {/* TODO: 이름 변경하기 */}
            <h2>가나다님, 이런 선물 어때요?</h2>
          </>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
