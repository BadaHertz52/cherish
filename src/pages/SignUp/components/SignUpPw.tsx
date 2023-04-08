import { useContext, useEffect, useState } from 'react';
import { SignUpContext, getToastModalPosition } from '@/pages/SignUp';
import { getPrevData } from './SignUpTopBar';
import { InputDataType, SignUpStateType, initialInputData } from '../signUpTypes';
import StepInner from './StepInner';
import PasswordForm from '@/components/PasswordForm';
import ToastModal from '@/components/Modals/ToastModal';
import { ToastModalType } from '@/components/Modals/modalTypes';

const SignUpPw = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [pw, setPw] = useState<InputDataType>(initialInputData);
  const [confirmPw, setConfirmPw] = useState<InputDataType>(initialInputData);
  const [openTostModal, setOpenToastModal] = useState<boolean>(false);
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
    const nextBtnEl = document.querySelector('.next-btn') as HTMLElement | null;
    if (nextBtnEl) {
      const { top, left } = getToastModalPosition(nextBtnEl);
      setToastModalState(prev => ({
        ...prev,
        top: top,
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
        {openTostModal && (
          <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
        )}
      </StepInner>
    </div>
  );
};

export default SignUpPw;
