import React, { useContext, useEffect } from 'react';
import { SignUpContext } from '../../../pages/SignUp';
import { moveProgressBar } from './ProgressBar';

export type NextBtnProps = {
  disableBtn: boolean;
  onClickNextBtn: () => void;
};
const SignUpNextBtn = ({ disableBtn, onClickNextBtn }: NextBtnProps) => {
  const { signUpState } = useContext(SignUpContext);
  useEffect(() => {
    disableBtn
      ? moveProgressBar(signUpState.progress, false)
      : moveProgressBar(signUpState.progress, true);
  }, [disableBtn]);
  return (
    <div className="next-btn">
      <button type="button" disabled={disableBtn} onClick={onClickNextBtn}>
        다음
      </button>
    </div>
  );
};

export default React.memo(SignUpNextBtn);
