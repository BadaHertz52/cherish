import { useRef, useMemo, useState } from 'react';

import CheckboxNotSelectedSvg from '@/assets/svgs/checkbox-not-selected.svg';
import CheckboxSelectedSvg from '@/assets/svgs/checkbox-selected.svg';
import ResetSvg from '@/assets/svgs/reset.svg';

import styles from './style.module.scss';
import '@/assets/Button.scss';

export type FilterType = '상품유형' | '성별' | '직업' | '상황' | null;
export type Filter = { type: FilterType; value: string[]; selected: boolean[] };

export type SearchFilterProps = {
  defaultFilters: Filter[];
  filters: Filter[];
  initialType: FilterType;
  setFilters: (filters: Filter[]) => void;
  close: () => void;
};

const SearchFilter = ({
  defaultFilters,
  filters,
  initialType,
  setFilters,
  close,
}: SearchFilterProps) => {
  const filterRef = useRef<HTMLDivElement>(null);

  const [currentFilters, setCurrentFilters] = useState<Filter[]>(
    JSON.parse(JSON.stringify(filters)),
  );
  const [currentType, setCurrentType] = useState(initialType);
  const [closing, setClosing] = useState(false);

  const currentFilter = useMemo(() => {
    return currentFilters.find(filter => filter.type === currentType)!;
  }, [currentType, currentFilters]);

  const handleClickFilterValue = (index: number) => {
    const targetFilterIndex = currentFilters.findIndex(
      filter => filter.type === currentFilter.type,
    );

    const targetFilter = currentFilters[targetFilterIndex];
    targetFilter.selected[index] = !targetFilter.selected[index];

    const nextFilters = currentFilters.slice();
    nextFilters.splice(targetFilterIndex, 1, targetFilter);

    setCurrentFilters(nextFilters);
  };

  const handleReset = () => {
    setCurrentFilters(JSON.parse(JSON.stringify(defaultFilters)));
  };

  const handleFiltering = () => {
    closeFilter(() => setFilters(currentFilters));
  };

  const closeFilter = (callback: Function) => {
    setClosing(true);
    setTimeout(() => {
      callback();
    }, 400);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (filterRef.current === e.target) {
      closeFilter(close);
    }
  };

  return (
    <div ref={filterRef} className={styles.searchFilter} onClick={e => handleClickOutside(e)}>
      <div className={`${styles.filterBox} ${closing && styles.fadeOut}`}>
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
          <span onClick={handleReset}>
            <ResetSvg />
            초기화
          </span>
        </div>
        <section>
          {currentFilter &&
            currentFilter.value.map((value, index) => (
              <li className={currentFilter.selected[index] ? styles.selected : ''} key={value}>
                <span onClick={() => handleClickFilterValue(index)}>
                  {currentFilter.selected[index] ? (
                    <CheckboxSelectedSvg />
                  ) : (
                    <CheckboxNotSelectedSvg />
                  )}
                  {value}
                </span>
              </li>
            ))}
        </section>
        <button className="abled" onClick={handleFiltering}>
          필터링하기
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
