import { memo } from 'react';
import styles from './style.module.scss';

interface CheckBoxProps {
  name: string;
  id: string;
  value: string;
  label: string;
  checked: boolean;
  checkOnlyOne: (checkThis: HTMLInputElement, value: string) => void;
}

const CheckBox = ({ name, id, value, label, checked, checkOnlyOne }: CheckBoxProps) => {
  return (
    <div className={styles.check}>
      <div className={styles.checkInner}>
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={e => checkOnlyOne(e.target, name)}
        />
        <label htmlFor={id} className={styles.check}></label>
        <label htmlFor={id} className={styles.labels}>
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default memo(CheckBox);
