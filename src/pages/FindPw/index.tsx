import React, { useRef, useState } from 'react';
import styles from './style.module.scss';
import { EmailVerification } from '@/components';
import { PasswordForm } from '@/components';
import { InputDataType, initialInputData } from '../SignUp/signUpTypes';

const FindPw = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  // 이메일 인증 여부
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(true);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [pw, setPw] = useState<InputDataType>(initialInputData);
  const [confirmPw, setConfirmPw] = useState<InputDataType>(initialInputData);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const handleClickBtn = () => {
    //change pw
  };
  return (
    <div id="find-pw">
      <h3>회원님의 비밀번호를 찾을 수 있도록 가입하신 이메일을 입력해 주세요.</h3>
      {openEmailForm ? (
        <EmailVerification
          additionOfLabel="가입하신"
          disableBtn={openEmailForm}
          setDisableBtn={setOpenEmailForm}
          email={email}
          setEmail={setEmail}
          emailDuplicationChecker={false}
          toastModalPositionTargetEl={btnRef.current}
        />
      ) : (
        <PasswordForm
          confirmPw={confirmPw}
          setConfirmPw={setConfirmPw}
          pw={pw}
          setPw={setPw}
          setDisableBtn={setDisableBtn}
        />
      )}
      <button
        type="button"
        ref={btnRef}
        className="btnChangePw"
        disabled={disableBtn}
        onClick={handleClickBtn}
      >
        다음
      </button>
    </div>
  );
};

export default React.memo(FindPw);
