import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '@/pages/SignUp';
import { getToastModalPosition } from '../functions';
import { getPrevData } from './SignUpTopBar';
import { InputDataType, SignUpStateType, initialInputData } from '../signUpTypes';
import StepInner from './StepInner';
import { PasswordForm, ToastModal } from '@/components';
import { ToastModalType } from '@/components/Modals/modalTypes';

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
    getPrevData('pw', setPw, undefined, undefined);
    getPrevData('confirmPw', setConfirmPw, undefined, undefined);
    if (signUpState.pw) {
      setPw({
        value: signUpState.pw,
        errorMsg: null,
      });
      setConfirmPw({
        value: signUpState.pw,
        errorMsg: null,
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
  }, []);
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
