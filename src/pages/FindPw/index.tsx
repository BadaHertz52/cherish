import React, { useState } from 'react';
import './style.scss';
import styles from './style.module.scss';
import { EmailVerification } from '@/components';
import { PasswordForm } from '@/components';
import { InputDataType, initialInputData } from '../SignUp/signUpTypes';

const FindPw = () => {
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
      <div className={styles.topBar}>
        <h2>비밀번호 찾기</h2>
      </div>
      <div className={styles.inner}>
        <h3>
          <p>회원님의 비밀번호를 찾을 수 있도록</p>
          <p>가입하신 이메일을 입력해 주세요.</p>
        </h3>
        {openEmailForm ? (
          <EmailVerification
            additionOfLabel="가입하신"
            disableBtn={openEmailForm}
            setDisableBtn={setOpenEmailForm}
            email={email}
            setEmail={setEmail}
            emailDuplicationChecker={false}
            toastModalPositionTargetEl={null}
          />
        ) : (
          <>
            <PasswordForm
              confirmPw={confirmPw}
              setConfirmPw={setConfirmPw}
              pw={pw}
              setPw={setPw}
              setDisableBtn={setDisableBtn}
            />
            <div className={styles.btnContainer}>
              <button
                type="button"
                className={styles.btnChangePw}
                disabled={disableBtn}
                onClick={handleClickBtn}
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(FindPw);
