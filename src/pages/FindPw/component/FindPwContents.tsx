import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { onFindPw } from '@/api/auth/findPwAPI';
import { EmailVerification, PasswordForm, ToastModal } from '@/components';
import { getToastModalPosition } from '@/components/Modals/functions';
import { ToastModalType } from '@/components/Modals/modalTypes';
import { InputDataType, initialInputData } from '@/pages/SignUp/signUpTypes';

import { FindPwChildProps } from '..';
import styles from '../style.module.scss';

const FindPwContents = ({
  openEmailForm,
  setOpenEmailForm,
  openAuthNumberForm,
  setOpenAuthNumberForm,
}: FindPwChildProps) => {
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [pw, setPw] = useState<InputDataType>(initialInputData);
  const [confirmPw, setConfirmPw] = useState<InputDataType>(initialInputData);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const [toastModalState, setToastModalState] = useState<ToastModalType>({
    contents: (
      <>
        <p>비밀번호가 변경되었어요.</p>
        <p> 다시 로그인 해주세요.</p>
      </>
    ),
    top: '0',
    left: '0',
  });
  const btnChangePwRef = useRef<HTMLButtonElement>(null);
  const handleToastModal = () => {
    const position = getToastModalPosition();
    if (position && btnChangePwRef.current) {
      const { top, left } = position;
      const newTop = `${top - btnChangePwRef.current.offsetHeight - 12 - 24}px`;
      setToastModalState(prev => ({
        ...prev,
        top: newTop,
        left: left,
      }));
      setOpenToastModal(true);
    }
  };
  const handleClickBtn = async () => {
    const result = await onFindPw({ email: email.value, password: pw.value });
    if (result.success) {
      handleToastModal();
      setTimeout(() => {
        window.location.pathname = '/login';
      }, 1000);
    }
  };
  return (
    <div className={styles.contents}>
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
            setDisableBtn={setDisabled}
          />
          <div className={`${styles.btnContainer} btn-container`}>
            <button
              type="button"
              ref={btnChangePwRef}
              className={styles.btnChangePw}
              disabled={disabled}
              onClick={handleClickBtn}
            >
              비밀번호 변경
            </button>
          </div>
        </>
      )}
      {openToastModal && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
      )}
    </div>
  );
};

export default FindPwContents;
