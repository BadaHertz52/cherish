import React, { ChangeEvent } from 'react';
import './style.scss';
type CheckBoxProps = {
  id: string;
  name: string;
  label: string;
  onChange: null | ((event: ChangeEvent<HTMLInputElement>) => void);
};
const CheckBox = ({ id, name, label, onChange }: CheckBoxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
  };
  return (
    <div className="check-box">
      <div className="check-box__inner">
        <input type="checkbox" id={id} name={name} onChange={event => handleChange(event)} />
        <label htmlFor={id} className="check"></label>
        <label htmlFor={id} className="check-box__label">
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default React.memo(CheckBox);
