import { useContext, useEffect, useState } from 'react';

import { PasswordForm, ToastModal } from '@/components';
import { getToastModalPosition } from '@/components/Modals/functions';
import { ToastModalType } from '@/components/Modals/modalTypes';
import { SignUpContext } from '@/pages/SignUp';

import {
  InputDataType,
  SIGN_UP_SESSION_DATA_KEY,
  SignUpSessionDataKeyType,
  SignUpStateType,
  initialInputData,
} from '../signUpTypes';

import { getPrevData } from './SignUpTopBar';
import StepInner from './StepInner';

const SignUpPw = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [pw, setPw] = useState<InputDataType>(initialInputData);
  const [confirmPw, setConfirmPw] = useState<InputDataType>(initialInputData);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const [toastModalState, setToastModalState] = useState<ToastModalType>({
    contents: '다음은 마지막 단계예요!',
    top: '',
    left: '',
  });
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => ({
      ...prev,
      progress: 'genderAndBirth',
      pw: pw.value,
    }));
  };
  //sessionStorage, signUpState 내용 가져오기
  useEffect(() => {
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.pw as SignUpSessionDataKeyType,
      setPw,
      undefined,
      undefined,
    );
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.confirmPw as SignUpSessionDataKeyType,
      setConfirmPw,
      undefined,
      undefined,
    );
    if (signUpState.pw) {
      setPw({
        value: signUpState.pw,
      });
      setConfirmPw({
        value: signUpState.pw,
      });
    }
    const position = getToastModalPosition();
    const nextBtnEl = document.querySelector('.next-btn') as HTMLElement | null;
    if (position && nextBtnEl) {
      const { top, left } = position;
      setToastModalState(prev => ({
        ...prev,
        top: `${top - nextBtnEl.offsetHeight - 16}px`,
        left: left,
      }));
    }
  }, [signUpState.pw]);
  useEffect(() => {
    if (toastModalState.top !== '') {
      setOpenToastModal(true);
    }
  }, [toastModalState.top]);
  return (
    <div id="sing-up__pw">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <PasswordForm
          confirmPw={confirmPw}
          setConfirmPw={setConfirmPw}
          setDisableBtn={setDisableBtn}
          pw={pw}
          setPw={setPw}
        />
        {openToastModal && (
          <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
        )}
      </StepInner>
    </div>
  );
};

export default SignUpPw;
