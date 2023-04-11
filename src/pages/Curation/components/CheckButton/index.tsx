import { memo } from 'react';
import '../../style.scss';

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
    <div className="check-element">
      <div className="check-element__inner">
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={e => checkOnlyOne(e.target, name)}
        />
        <label htmlFor={id} className="labels">
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default memo(CheckBox);
