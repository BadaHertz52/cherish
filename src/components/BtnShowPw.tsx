import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction } from 'react';
import '../assets/btnShowPw.scss';
type BtnShowPwProps = {
  showPw: boolean;
  setShowPw: Dispatch<SetStateAction<boolean>>;
};
const BtnShowPw = ({ showPw, setShowPw }: BtnShowPwProps) => {
  return (
    <button
      type="button"
      className={showPw ? 'btn-show-pw on' : 'btn-show-pw'}
      title="button that show pw as text"
      onClick={() => setShowPw(prev => !prev)}
    >
      <FontAwesomeIcon icon={faEye} />
    </button>
  );
};

export default React.memo(BtnShowPw);
