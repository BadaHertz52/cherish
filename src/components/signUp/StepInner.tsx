import { ReactNode } from 'react';
import NextBtn, { NextBtnProps } from './NextBtn';
import ProgressBar from './ProgressBar';
type StepInnerProps = NextBtnProps & {
  children: ReactNode;
};
const StepInner = ({ children, disableBtn, onClickNextBtn }: StepInnerProps) => {
  return (
    <div className="step__inner">
      {children}
      <ProgressBar />
      <NextBtn disableBtn={disableBtn} onClickNextBtn={onClickNextBtn} />
    </div>
  );
};

export default StepInner;
