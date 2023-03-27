import { CSSProperties, useContext, useEffect, useState } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import { progressArr, SignUpProgressType } from './signUpTypes';
import '../../assets/signUp/progressBar.scss';
const ProgressBar = () => {
  const { signUpState } = useContext(SignUpContext);
  const [progressStyle, setProgressStyle] = useState<CSSProperties | undefined>(undefined);
  useEffect(() => {
    // 현재 진행 중인 회원가입의 단계
    const currentStepIndex = progressArr.indexOf(signUpState.progress);
    setProgressStyle({
      width: '20%',
      left: `${20 * (currentStepIndex - 1)}%`,
    });
  }, [signUpState]);

  return (
    <div className="progressBar">
      <div className="out-box bar">
        <div className="progress bar" style={progressStyle} role="progressbar"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
