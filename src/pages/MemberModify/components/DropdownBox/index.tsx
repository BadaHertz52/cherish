import { useEffect, useRef, useState } from 'react';

import ChekckSvg from '@/assets/svgs/check.svg';
import DropdownDownArrowSvg from '@/assets/svgs/dropdown-arrow.svg';

import styles from './style.module.scss';

export type DropdownBoxProps = {
  value: string;
  setValue: (value: string) => void;
  items: string[];
};

export const DropdownBox = ({ value, setValue, items }: DropdownBoxProps) => {
  const dropdownBoxRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickInput = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownBoxRef.current && !dropdownBoxRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownBox} ref={dropdownBoxRef}>
      <div
        className={`${styles.input} ${isDropdownOpen && styles.selected}`}
        onClick={handleClickInput}
      >
        <div>{value}</div>
        <DropdownDownArrowSvg />
      </div>
      {isDropdownOpen && (
        <div className={styles.box}>
          {items.map(item => (
            <div
              className={`${styles.item} ${value === item && styles.selected}`}
              onClick={() => setValue(item)}
              key={item}
            >
              <ChekckSvg />
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
