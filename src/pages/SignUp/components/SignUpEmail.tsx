import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '..';
import { initialInputData, InputDataType, SignUpStateType } from '../signUpTypes';
import StepInner from './StepInner';
import { getPrevData } from './SignUpTopBar';
import EmailVerification from '@/components/EmailVerification';
const SignUpEmail = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);

  const onClickCloseBtnInAlertModal = () => {
    if (sessionStorage.getItem('signUpBackUpData') !== null) {
      sessionStorage.removeItem('signUpBackUpData');
    }
    //[todo] 이메일 인증 횟수 초과 시 해야하는 것
    setOpenAlertModal(false);
  };
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => ({
      ...prev,
      progress: 'pw',
      email: email.value,
    }));
  };
  useEffect(() => {
    getPrevData('email', setEmail, undefined, undefined);
    if (signUpState.email) {
      setEmail({
        value: signUpState.email,
        errorMsg: null,
      });
      // 이미 인증이 완료 된 경우에 다음 버튼 클릭 가능
      setDisableBtn(false);
    }
  }, []);

  return (
    <div id="email">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <EmailVerification
          additionOfLabel="로그인을 위한"
          disableBtn={disableBtn}
          setDisableBtn={setDisableBtn}
          email={email}
          setEmail={setEmail}
          openAlertModal={openAlertModal}
          setOpenAlertModal={setOpenAlertModal}
          openToastModal={openToastModal}
          setOpenToastModal={setOpenToastModal}
          emailDuplicationChecker={true}
          onClickCloseBtnInAlertModal={onClickCloseBtnInAlertModal}
        />
      </StepInner>
    </div>
  );
};

export default SignUpEmail;
