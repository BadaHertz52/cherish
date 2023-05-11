import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { EmailVerification } from '@/components';

import { SignUpContext } from '..';
import {
  initialInputData,
  InputDataType,
  SIGN_UP_SESSION_DATA_KEY,
  SignUpSessionDataKeyType,
  SignUpStateType,
} from '../signUpTypes';

import { getPrevData } from './SignUpTopBar';
import StepInner from './StepInner';

type SignUpEmailProps = {
  openAuthNumberForm: boolean;
  setOpenAuthNumberForm: Dispatch<SetStateAction<boolean>>;
};
const SignUpEmail = ({ openAuthNumberForm, setOpenAuthNumberForm }: SignUpEmailProps) => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);

  const nextBtnEl = document.querySelector('.next-btn') as HTMLElement | null;
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => ({
      ...prev,
      progress: 'pw',
      email: email.value,
    }));
  };
  useEffect(() => {
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.email as SignUpSessionDataKeyType,
      setEmail,
      undefined,
      undefined,
      undefined,
    );
    if (signUpState.email) {
      setEmail({
        value: signUpState.email,
        errorType: undefined,
      });
      // 이미 인증이 완료 된 경우에 다음 버튼 클릭 가능
      setDisableBtn(false);
      setOpenAuthNumberForm(true);
    }
  }, []);
  return (
    <div id="email">
      <StepInner
        disableBtn={disableBtn}
        onClickNextBtn={onClickNextBtn}
        isNextBtnHidden={!openAuthNumberForm}
      >
        <EmailVerification
          additionOfLabel="아이디로 사용할"
          setDisableBtn={setDisableBtn}
          email={email}
          setEmail={setEmail}
          openAuthNumberForm={openAuthNumberForm}
          setOpenAuthNumberForm={setOpenAuthNumberForm}
          toastModalPositionTargetEl={nextBtnEl}
        />
      </StepInner>
    </div>
  );
};

export default SignUpEmail;
