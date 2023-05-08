import React, { ReactNode, useContext, useEffect } from 'react';

import { removeVh, setVh } from '@/functions/vh';
import { SignUpContext } from '@/pages/SignUp';

import NextBtn, { NextBtnProps } from './SignUpNextBtn';

type StepInnerProps = NextBtnProps & {
  children: ReactNode;
  isNextBtnHidden?: boolean;
};
const StepInner = ({ children, disableBtn, onClickNextBtn, isNextBtnHidden }: StepInnerProps) => {
  const { signUpState } = useContext(SignUpContext);

  useEffect(() => {
    setVh();
    window.addEventListener('resize', setVh);
    return () => {
      removeVh();
      window.removeEventListener('resize', setVh);
    };
  }, []);
  return (
    <div className="step__inner">
      {signUpState.progress !== 'agreeToTerms' && (
        <h3 className="step__inner__header">
          {signUpState.progress == 'genderAndBirth' || signUpState.progress === 'job'
            ? '선물 큐레이션을 위한 정보를 입력해 주세요.'
            : '회원가입을 위한 정보를 입력해 주세요.'}
        </h3>
      )}
      <div className="step__inner__body">{children}</div>
      <NextBtn
        disableBtn={disableBtn}
        onClickNextBtn={onClickNextBtn}
        isNextBtnHidden={isNextBtnHidden}
      />
    </div>
  );
};

export default React.memo(StepInner);
