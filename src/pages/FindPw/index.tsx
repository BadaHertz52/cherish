import React, { useState } from 'react';
import './style.scss';
import styles from './style.module.scss';
import { EmailVerification } from '@/components';
import { PasswordForm } from '@/components';
import { InputDataType, initialInputData } from '../SignUp/signUpTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const FindPw = () => {
  // 이메일 인증 여부
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(true);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [pw, setPw] = useState<InputDataType>(initialInputData);
  const [confirmPw, setConfirmPw] = useState<InputDataType>(initialInputData);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClickBtn = () => {
    //change pw
    // 서버 연동 후
    //opentoastmodal
    setTimeout(() => {
      navigate('/login');
    }, 2100);
  };
  const onClickPrevBtn = () => {
    if (openEmailForm) {
      navigate('/login');
    } else {
      setOpenEmailForm(true);
    }
  };
  return (
    <div id="find-pw">
      <div className={styles.topBar}>
        <button className="btn-prev" onClick={onClickPrevBtn} title="btn-prev" type="button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
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
            <div className={`${styles.btnContainer} btn-container`}>
              <button
                type="button"
                className={styles.btnChangePw}
                disabled={disableBtn}
                onClick={handleClickBtn}
              >
                비밀번호 변경
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(FindPw);
