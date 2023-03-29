import React, { ReactNode, useContext } from 'react';
import NextBtn, { NextBtnProps } from './NextBtn';
type StepInnerProps = NextBtnProps & {
  children: ReactNode;
};
const StepInner = ({ children, disableBtn, onClickNextBtn }: StepInnerProps) => {
  return (
    <div className="step__inner">
      <div className="step__inner__header">Welcome!</div>
      {children}
      <NextBtn disableBtn={disableBtn} onClickNextBtn={onClickNextBtn} />
    </div>
  );
};

export default React.memo(StepInner);
