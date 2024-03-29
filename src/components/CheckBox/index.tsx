import React from 'react';
import './style.scss';
type CheckBoxProps = {
  id: string;
  name: string;
  label: string;
  // checked인 input 의 name을 모아 둔 state에 해당 input의 name이  있는 지 여부
  isChecked: (name?: string) => boolean;
  onChange?: () => void;
};
const CheckBox = ({ id, name, label, isChecked, onChange }: CheckBoxProps) => {
  const handleChange = () => {
    onChange && onChange();
  };
  return (
    <div className="check-box">
      <div className="check-box__inner">
        <input
          type="checkbox"
          checked={isChecked(name)}
          id={id}
          name={name}
          onChange={handleChange}
        />
        <label htmlFor={id} className="check"></label>
        <label htmlFor={id} className={`check-box__label ${isChecked(name) ? 'on' : ''}`}>
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default React.memo(CheckBox);
