import React from 'react';
import { SignUpProgressType, progressArr } from './signUpTypes';

export const moveProgressBar = (progress: SignUpProgressType, forward: boolean) => {
  const progressEl = document.querySelector('.progress') as HTMLElement | null;
  const progressIndex = progressArr.indexOf(progress);
  if (progressEl !== null) {
    const number: number = forward ? progressIndex + 1 : progressIndex;
    if (progressIndex === progressArr.length - 1) {
      progressEl.style.left = '0';
    } else {
      const left = `-${((progressArr.length - number) / progressArr.length) * 100}%`;
      progressEl.style.left = left;
    }
  }
};
const ProgressBar = () => {
  return (
    <div className="progressBar">
      <div className="out-box bar">
        <div className="progress bar" role="progressbar"></div>
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);
