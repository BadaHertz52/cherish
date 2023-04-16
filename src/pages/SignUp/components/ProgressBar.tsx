import React from 'react';

import { SignUpProgressType, PROGRESS_ARR } from '../signUpTypes';

export const moveProgressBar = (progress: SignUpProgressType, forward: boolean) => {
  const progressEl = document.querySelector('.progress') as HTMLElement | null;
  const progressIndex = PROGRESS_ARR.indexOf(progress);
  if (progressEl) {
    const number: number = forward ? progressIndex + 1 : progressIndex;
    if (progressIndex === PROGRESS_ARR.length - 1 && forward) {
      progressEl.style.left = '0';
    } else {
      const left = `-${((PROGRESS_ARR.length - number) / PROGRESS_ARR.length) * 100}%`;
      progressEl.style.left = left;
    }
  }
};
const ProgressBar = () => {
  return (
    <div className="progressBar">
      <div className="out-box bar">
        <div className="progress bar" role="progressbar" title="progress bar"></div>
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);
