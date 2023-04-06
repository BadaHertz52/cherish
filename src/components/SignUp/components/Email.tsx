import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '..';
import { initialInputData, InputDataType, SignUpStateType } from './signUpTypes';
import StepInner from './StepInner';
import { getPrevData } from './SignUpTopBar';
import EmailVerification from '@/components/EmailVerification';
const Email = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);

  const onClickCloseBtnInAlertModal = () => {
    if (sessionStorage.getItem('signUpBackUpData') !== null) {
      sessionStorage.removeItem('signUpBackUpData');
    }
    // 이메일 인증 횟수 초과 시
    setOpenAlertModal(false);
  };
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => {
      const newState: SignUpStateType = {
        ...prev,
        progress: 'pw',
        email: email.value,
      };
      return newState;
    });
  };
  useEffect(() => {
    getPrevData('email', setEmail, null, null);
    if (signUpState.email !== null) {
      setEmail({
        value: signUpState.email,
        errorMsg: null,
      });
      // 이미 인증이 완료 된 경우에 다음 버튼 클릭 가능
      console.log('ddd');
      setDisableBtn(false);
    }
  }, []);

  return (
    <div id="email">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <EmailVerification
          disableBtn={disableBtn}
          setDisableBtn={setDisableBtn}
          email={email}
          setEmail={setEmail}
          openAlertModal={openAlertModal}
          setOpenAlertModal={setOpenAlertModal}
          openToastModal={openToastModal}
          setOpenToastModal={setOpenToastModal}
          isEmailDuplicate={true}
          onClickCloseBtnInAlertModal={onClickCloseBtnInAlertModal}
        />
      </StepInner>
    </div>
  );
};

export default Email;
