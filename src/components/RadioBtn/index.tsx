import React from 'react';

import styles from './style.module.scss';
type CheckBoxProps = {
  id: string;
  name: string;
  label: string;
  // checked인 input 의 name을 모아 둔 state에 해당 input의 name이  있는 지 여부
  isChecked: (name?: string) => boolean;
  onChange?: () => void;
};
const RadioBtn = ({ id, name, label, isChecked, onChange }: CheckBoxProps) => {
  const handleChange = () => {
    onChange && onChange();
  };
  return (
    <div className={styles.radioBtn}>
      <div className={styles.radioBtnInner}>
        <input
          type="radio"
          checked={isChecked(name)}
          id={id}
          className={styles.radioBtnInput}
          name={name}
          value={name}
          onChange={handleChange}
        />
        <label
          htmlFor={id}
          className={isChecked(name) ? styles.radioBtnCheckOn : styles.radioBtnCheckOff}
        ></label>
        <label
          htmlFor={id}
          className={isChecked(name) ? styles.radioBtnLabelOn : styles.radioBtnLabel}
        >
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default React.memo(RadioBtn);
