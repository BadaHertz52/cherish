import React from 'react';
import { SignUpProgressType } from './signUpTypes';

export const moveProgressBar = (progress: SignUpProgressType) => {
  const progressEl = document.querySelector('.progress');
  if (progressEl !== null) {
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
