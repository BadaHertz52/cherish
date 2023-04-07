import styles from './style.module.scss';
import ResetSvg from '@/assets/svgs/reset.svg';
import { useMemo, useState } from 'react';
import CheckboxNotSelectedSvg from '@/assets/svgs/checkbox-not-selected.svg';
import CheckboxSelectedSvg from '@/assets/svgs/checkbox-selected.svg';
import '@/assets/Button.scss';

export type FilterType = '상품유형' | '성별' | '직업' | '상황' | null;
export type Filter = { type: FilterType; value: string[]; selected: boolean[] };

export type SearchFilterProps = {
  FILTERS: Filter[];
  type: FilterType;
};

const SearchFilter = ({ FILTERS, type }: SearchFilterProps) => {
  const [currentFilters, setCurrentFilters] = useState(FILTERS);
  const [currentType, setCurrentType] = useState(type);

  const currentFilter = useMemo(() => {
    return FILTERS.find(filter => filter.type === currentType)!;
  }, [currentType]);

  const handleClickFilterValue = (index: number) => {
    const targetFilterIndex = currentFilters.findIndex(
      filter => filter.value === currentFilter.value,
    )!;

    const targetFilter = currentFilters[targetFilterIndex];
    targetFilter.selected[index] = !targetFilter.selected[index];

    let nextFilters = currentFilters.slice();
    nextFilters.splice(targetFilterIndex, 1, targetFilter);

    setCurrentFilters(nextFilters);
  };

  return (
    <div className={styles.searchFilter}>
      <div className={styles.filterBox}>
        <div className={styles.filterTap}>
          {currentFilters.map(filter => (
            <li
              className={currentType === filter.type ? styles.selected : ''}
              key={filter.type}
              onClick={() => setCurrentType(filter.type)}
            >
              {filter.type}
            </li>
          ))}
          <span>
            <ResetSvg />
            초기화
          </span>
        </div>
        <section>
          {currentFilter &&
            currentFilter.value.map((value, index) => (
              <li
                className={currentFilter.selected[index] ? styles.selected : ''}
                key={value}
                onClick={() => handleClickFilterValue(index)}
              >
                {currentFilter.selected[index] ? (
                  <CheckboxSelectedSvg />
                ) : (
                  <CheckboxNotSelectedSvg />
                )}
                {value}
              </li>
            ))}
        </section>
        <button className="abled">필터링하기</button>
      </div>
    </div>
  );
};

export default SearchFilter;
