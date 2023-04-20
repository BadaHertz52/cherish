import { useState } from 'react';

import ChekckSvg from '@/assets/svgs/check.svg';
import DropdownDownArrowSvg from '@/assets/svgs/dropdown-arrow.svg';

import styles from './style.module.scss';

export type DropdownBoxProps = {
  value: string;
  setValue: (value: string) => void;
  items: string[];
};

export const DropdownBox = ({ value, setValue, items }: DropdownBoxProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickInput = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.dropdownBox}>
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
