import React, { useRef } from 'react';

import styles from './style.module.scss';
type CheckBoxProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  // checked인 input 의 name을 모아 둔 state에 해당 input의 name이  있는 지 여부
  onChange?: () => void;
};
const RadioBtn = ({ id, name, value, label, onChange }: CheckBoxProps) => {
  const radioBtnRef = useRef<HTMLInputElement>(null);
  const handleChange = () => {
    onChange && onChange();
  };
  return (
    <div className={styles.radioBtn}>
      <div className={styles.radioBtnInner}>
        <input
          type="radio"
          id={id}
          ref={radioBtnRef}
          className={styles.radioBtnInput}
          name={name}
          value={value}
          onChange={handleChange}
        />
        <label
          htmlFor={id}
          className={
            radioBtnRef.current?.checked ? styles.radioBtnCheckOn : styles.radioBtnCheckOff
          }
        ></label>
        <label
          htmlFor={id}
          className={radioBtnRef.current?.checked ? styles.radioBtnLabelOn : styles.radioBtnLabel}
        >
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default React.memo(RadioBtn);
