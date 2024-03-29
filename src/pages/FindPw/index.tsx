import React, { useRef, useState } from 'react';

import './style.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { onFindPw } from '@/api/auth/findPwAPI';
import { PasswordForm, EmailVerification, ToastModal } from '@/components';
import { ToastModalType } from '@/components/Modals/modalTypes';

import { getToastModalPosition } from '../SignUp/functions';
import { InputDataType, initialInputData } from '../SignUp/signUpTypes';

import styles from './style.module.scss';

const FindPw = () => {
  // 이메일 인증 여부
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(true);
  const [openAuthNumberForm, setOpenAuthNumberForm] = useState<boolean>(false);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [pw, setPw] = useState<InputDataType>(initialInputData);
  const [confirmPw, setConfirmPw] = useState<InputDataType>(initialInputData);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const [toastModalState, setToastModalState] = useState<ToastModalType>({
    contents: '비밀번호가 변경되었어요. 다시 로그인 해주세요.',
    top: '0',
    left: '0',
  });
  const btnChangePwRef = useRef<HTMLButtonElement>(null);
  const handleToastModal = () => {
    const position = getToastModalPosition();
    if (position && btnChangePwRef.current) {
      const { top, left } = position;
      const newTop = `${top - btnChangePwRef.current.offsetHeight}px`;
      setToastModalState(prev => ({
        ...prev,
        top: newTop,
        left: left,
      }));
      setOpenToastModal(true);
    }
  };
  const handleClickBtn = async () => {
    const result = await onFindPw({ password: pw.value });
    if (result.success) {
      //open toast modal
      handleToastModal();
      setTimeout(() => {
        window.location.pathname = '/login';
      }, 2100);
    }
  };
  const onClickPrevBtn = () => {
    if (openEmailForm) {
      openAuthNumberForm ? setOpenAuthNumberForm(false) : (window.location.pathname = '/login');
    } else {
      setOpenEmailForm(true);
      setOpenAuthNumberForm(true);
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
        {openEmailForm ? (
          <>
            <h3>
              <p>회원님의 비밀번호를 찾을 수 있도록</p>
              <p>가입하신 이메일을 입력해 주세요.</p>
            </h3>
            <EmailVerification
              additionOfLabel="가입하신"
              setDisableBtn={setOpenEmailForm}
              email={email}
              setEmail={setEmail}
              openAuthNumberForm={openAuthNumberForm}
              setOpenAuthNumberForm={setOpenAuthNumberForm}
              toastModalPositionTargetEl={null}
              isInFindPw={true}
            />
          </>
        ) : (
          <>
            <h3>
              <p>비밀번호 재설정</p>
            </h3>
            <PasswordForm
              additionOfLabel="신규"
              confirmPw={confirmPw}
              setConfirmPw={setConfirmPw}
              pw={pw}
              setPw={setPw}
              setDisableBtn={setDisableBtn}
            />
            <div className={`${styles.btnContainer} btn-container`}>
              <button
                type="button"
                ref={btnChangePwRef}
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
      {openToastModal && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
      )}
    </div>
  );
};

export default React.memo(FindPw);
