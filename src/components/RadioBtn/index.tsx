import React, { useRef } from 'react';

import styles from './style.module.scss';
export type RadioBtnProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  isChecked: boolean;
  onChange?: () => void;
};
const RadioBtn = ({ id, name, value, label, isChecked, onChange }: RadioBtnProps) => {
  const handleChange = () => {
    onChange && onChange();
  };
  return (
    <div className={styles.radioBtn}>
      <div className={styles.radioBtnInner}>
        <input
          type="radio"
          id={id}
          className={styles.radioBtnInput}
          name={name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
        />
        <label
          htmlFor={id}
          className={isChecked ? styles.radioBtnCheckOn : styles.radioBtnCheckOff}
        ></label>
        <label htmlFor={id} className={isChecked ? styles.radioBtnLabelOn : styles.radioBtnLabel}>
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default React.memo(RadioBtn);
