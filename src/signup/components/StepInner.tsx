import React, { ReactNode, useContext } from 'react';
import NextBtn, { NextBtnProps } from './NextBtn';
import { SignUpContext } from '..';
type StepInnerProps = NextBtnProps & {
  children: ReactNode;
};
const StepInner = ({ children, disableBtn, onClickNextBtn }: StepInnerProps) => {
  const { signUpState } = useContext(SignUpContext);
  return (
    <div className="step__inner">
      {signUpState.progress !== 'agreeToTerms' && (
        <h3 className="step__inner__header">
          {signUpState.progress == 'genderAndBirth' || signUpState.progress === 'job'
            ? '선물 큐레이션을 위한 정보를 입력해 주세요.'
            : '회원가입을 위한 정보를 입력해 주세요.'}
        </h3>
      )}

      {children}
      <NextBtn disableBtn={disableBtn} onClickNextBtn={onClickNextBtn} />
    </div>
  );
};

export default React.memo(StepInner);
