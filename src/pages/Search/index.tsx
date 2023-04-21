import { useState, useEffect } from 'react';

import { searchByKeword } from '@/api/search';
import FilterDropdownSvg from '@/assets/svgs/filter-dropdown.svg';
import { ItemCard } from '@/components';
import type { Item } from '@/components/ItemCard';
import type { Filter, FilterType } from '@/pages/Search/components/SearchFilter';

import SearchFilter from './components/SearchFilter';
import SearchHeader from './components/SearchHeader';
import SearchKeywordSection from './components/SearchKeywordSection';
import styles from './style.module.scss';

const FILTERS: Filter[] = [
  {
    type: '상품유형',
    value: ['식품', '의류/잡화', '뷰티', '리빙/주방', '디지털가전', '기타'],
    selected: [false, false, false, false, false, false],
  },
  { type: '성별', value: ['남자', '여자'], selected: [false, false] },
  {
    type: '직업',
    value: [
      '전문직',
      '사무직',
      '판매/서비스직',
      '노동/생산직',
      '자영업',
      '학생',
      '전업주부',
      '무직',
      '기타',
    ],
    selected: [false, false, false, false, false, false, false, false, false],
  },
  {
    type: '상황',
    value: [
      '생일',
      '이사/집들이',
      '입학/졸업',
      '퇴사/퇴직',
      '취업/이직',
      '전역',
      '병문안(아플 때)',
      '기념일',
      '출산/육아',
    ],
    selected: [false, false, false, false, false, false, false, false, false],
  },
];

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState(FILTERS);

  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [recommendKeywords, setRecommendKeywords] = useState<string[]>([]);
  const [recentProducts, setRecentProducts] = useState<Item[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<Item[]>([]);

  const [isSearch, setIsSearch] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(null);

  const handleSearch = async (currentKeyword: string) => {
    setKeyword(currentKeyword);

    const contents = (await searchByKeword(currentKeyword)).map(content => {
      return {
        ...content,
        bookmarked: false,
      };
    });
    // TODO: 예외처리
    setSearchedProducts(contents);
    setIsSearch(true);
  };

  const handleShowFilters = (type: FilterType) => {
    setFilterType(type);
  };

  const handleSetFilters = (nextFilters: Filter[]) => {
    setFilterType(null);
    setFilters(nextFilters);
  };

  useEffect(() => {
    // TODO: fetch list at filter
  }, [filters]);

  useEffect(() => {
    // TODO: fetch API
    setRecentKeywords(['졸업식', '엄마', '40대']);
    setRecommendKeywords(['화이트데이', '스몰럭셔리', '가정의 달']);
    setRecentProducts(
      Array.from({ length: 7 }, (_, index) => ({
        id: index,
        brand: 'Aesop',
        name: '최근 본 상품',
        price: 31000,
        imgUrl:
          'https://ichef.bbci.co.uk/news/800/cpsprodpb/E172/production/_126241775_getty_cats.png',
        bookmarked: true,
      })),
    );
  }, []);

  return (
    <div className={styles.searchPage}>
      <SearchHeader keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
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
              {filters.map((filter, index) => (
                <div
                  className={styles.filter}
                  key={index}
                  onClick={() => handleShowFilters(filter.type)}
                >
                  <span>{filter.type}</span>
                  <FilterDropdownSvg />
                </div>
              ))}
            </div>
            {/* TODO: 이름 변경하기 */}
            <h2>가나다님, 이런 선물 어때요?</h2>
            <div className={styles.searchedProductSection}>
              {searchedProducts.map(item => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          </>
        )}
      </section>
      {filterType && (
        <SearchFilter
          defaultFilters={FILTERS}
          filters={filters}
          initialType={filterType}
          setFilters={handleSetFilters}
          close={() => setFilterType(null)}
        />
      )}
    </div>
  );
};

export default SearchPage;
