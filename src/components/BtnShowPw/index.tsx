import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction } from 'react';
import './style.scss';
type BtnShowPwProps = {
  hiddenPw: boolean;
  setHiddenPw: Dispatch<SetStateAction<boolean>>;
};
const BtnShowPw = ({ hiddenPw, setHiddenPw }: BtnShowPwProps) => {
  return (
    <button
      type="button"
      className={!hiddenPw ? 'btn-show-pw on' : 'btn-show-pw'}
      title="button that show pw as text"
      onClick={() => setHiddenPw(prev => !prev)}
    >
      <FontAwesomeIcon icon={!hiddenPw ? faEye : faEyeSlash} />
    </button>
  );
};

export default React.memo(BtnShowPw);
