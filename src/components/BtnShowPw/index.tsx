import React, { Dispatch, SetStateAction } from 'react';

import EyeSvg from '@/assets/svgs/eye.svg';
import EyeSlashSvg from '@/assets/svgs/eyeslash.svg';

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
      {hiddenPw ? <EyeSlashSvg /> : <EyeSvg />}
    </button>
  );
};

export default React.memo(BtnShowPw);
