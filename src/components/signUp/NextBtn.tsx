import React, { useContext } from 'react';
import { SignUpContext } from '../../pages/SignUp';

export type NextBtnProps = {
  disableBtn: boolean;
  onClickNextBtn: () => void;
};
const NextBtn = ({ disableBtn, onClickNextBtn }: NextBtnProps) => {
  const { signUpState } = useContext(SignUpContext);
  return (
    <div className="next-btn">
      <button
        type={signUpState.progress === 'job' ? 'submit' : 'button'}
        disabled={disableBtn}
        onClick={onClickNextBtn}
      >
        다음으로
      </button>
    </div>
  );
};

export default React.memo(NextBtn);
