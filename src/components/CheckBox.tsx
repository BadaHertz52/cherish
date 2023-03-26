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
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState<boolean>(
    inputRef.current !== null ? inputRef.current.checked : false,
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange !== null && onChange(event);
    const target = event.target as HTMLInputElement;
    setChecked(target.checked);
  };
  return (
    <div className="check-box">
      <div className="check-box__inner">
        <input
          type="checkbox"
          id={id}
          name={name}
          ref={inputRef}
          onChange={event => handleChange(event)}
        />
        <label htmlFor={id} className="label">
          {label}
        </label>
        {checked && (
          <label htmlFor="checkboxKeep" className="check">
            <FontAwesomeIcon icon={faCheck} />
          </label>
        )}
      </div>
    </div>
  );
};

export default React.memo(CheckBox);
