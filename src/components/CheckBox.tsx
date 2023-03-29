import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import '../assets/checkbox.scss';
type CheckBoxProps = {
  id: string;
  name: string;
  label: string;
  onChange: null | ((event: ChangeEvent<HTMLInputElement>) => void);
};
const CheckBox = ({ id, name, label, onChange }: CheckBoxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange !== null && onChange(event);
  };
  return (
    <div className="check-box">
      <div className="check-box__inner">
        <input type="checkbox" id={id} name={name} onChange={event => handleChange(event)} />
        <label htmlFor={id} className="check"></label>
        <label htmlFor={id} className="label">
          {label}
        </label>
      </div>
    </div>
  );
};

export default React.memo(CheckBox);
