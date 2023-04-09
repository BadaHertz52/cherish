import { memo } from 'react';
import styles from './style.module.scss';

interface RadioButtonProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  hanleChangeValue: () => void;
}

const RadioButton = ({ id, name, label, checked, hanleChangeValue }: RadioButtonProps) => {
  return (
    <div className={styles.radio}>
      <div className={styles.radioInner}>
        <input type="radio" id={id} name={name} checked={checked} onChange={hanleChangeValue} />
        <label htmlFor={id} className={styles.labels}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default memo(RadioButton);
