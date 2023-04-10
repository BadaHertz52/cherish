import React, { useContext, useEffect } from 'react';

import { SignUpContext } from '@/pages/SignUp';

import { moveProgressBar } from './ProgressBar';

export type NextBtnProps = {
  disableBtn: boolean;
  onClickNextBtn: () => void;
  // email form에서 인증 번호 입력 전 단계에서 숨겨짐
  isNextBtnHidden?: boolean;
};
const SignUpNextBtn = ({ disableBtn, onClickNextBtn, isNextBtnHidden }: NextBtnProps) => {
  const { signUpState } = useContext(SignUpContext);
  useEffect(() => {
    disableBtn
      ? moveProgressBar(signUpState.progress, false)
      : moveProgressBar(signUpState.progress, true);
  }, [disableBtn]);
  return (
    <div className={`next-btn ${!isNextBtnHidden ? 'on' : ''}`}>
      <button type="button" disabled={disableBtn} onClick={onClickNextBtn}>
        {signUpState.progress === 'job' ? '회원가입 완료' : '다음'}
      </button>
    </div>
  );
};

export default React.memo(SignUpNextBtn);
