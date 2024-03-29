import { memo } from 'react';
import '../../style.scss';

interface RadioButtonProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  hanleChangeValue: () => void;
}

const RadioButton = ({ id, name, label, checked, hanleChangeValue }: RadioButtonProps) => {
  return (
    <div className="check-element">
      <div className="checkElementInner">
        <input type="radio" id={id} name={name} checked={checked} onChange={hanleChangeValue} />
        <label htmlFor={id} className="labels">
          {label}
        </label>
      </div>
    </div>
  );
};

export default memo(RadioButton);
