import React, { ReactNode, useContext } from 'react';
import NextBtn, { NextBtnProps } from './NextBtn';
import ProgressBar from './ProgressBar';
import { SignUpContext } from '../../pages/SignUp';
type StepInnerProps = NextBtnProps & {
  children: ReactNode;
};
const StepInner = ({ children, disableBtn, onClickNextBtn }: StepInnerProps) => {
  const { signUpState } = useContext(SignUpContext);
  return (
    <div className="step__inner">
      <div className="step__inner__header">Welcome!</div>
      {children}
      {signUpState.progress !== 'agreeToTerms' && <ProgressBar />}
      <NextBtn disableBtn={disableBtn} onClickNextBtn={onClickNextBtn} />
    </div>
  );
};

export default React.memo(StepInner);
