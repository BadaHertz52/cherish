import styles from './style.module.scss';
import ResetSvg from '@/assets/svgs/reset.svg';
import { useRef, useMemo, useState } from 'react';
import CheckboxNotSelectedSvg from '@/assets/svgs/checkbox-not-selected.svg';
import CheckboxSelectedSvg from '@/assets/svgs/checkbox-selected.svg';
import '@/assets/Button.scss';

export type FilterType = '상품유형' | '성별' | '직업' | '상황' | null;
export type Filter = { type: FilterType; value: string[]; selected: boolean[] };

export type SearchFilterProps = {
  defaultFilters: Filter[];
  filters: Filter[];
  type: FilterType;
  setFilters: (filters: Filter[]) => void;
  close: () => void;
};

const SearchFilter = ({ defaultFilters, filters, type, setFilters, close }: SearchFilterProps) => {
  const filterRef = useRef<HTMLDivElement>(null);

  const [currentFilters, setCurrentFilters] = useState<Filter[]>(filters);
  const [currentType, setCurrentType] = useState(type);
  const [closing, setClosing] = useState(false);

  const currentFilter = useMemo(() => {
    return currentFilters.find(filter => filter.type === currentType)!;
  }, [currentType, currentFilters]);

  const handleClickFilterValue = (index: number) => {
    const targetFilterIndex = currentFilters.findIndex(
      filter => filter.type === currentFilter.type,
    );

    let nextFilters = JSON.parse(JSON.stringify(currentFilters));

    const targetFilter = nextFilters[targetFilterIndex];
    targetFilter.selected[index] = !targetFilter.selected[index];

    setCurrentFilters(nextFilters);
  };

  const handleReset = () => {
    setCurrentFilters(defaultFilters);
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
