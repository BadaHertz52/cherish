import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '..';
import { initialInputData, InputDataType, SignUpStateType } from '../signUpTypes';
import StepInner from './StepInner';
import { getPrevData } from './SignUpTopBar';
import { EmailVerification } from '@/components';
import axios, { AxiosError } from 'axios';
import { ResultOfEmailAPI } from '@/components/EmailVerification/types';
const SignUpEmail = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [openAuthNumberForm, setOpenAuthNumberForm] = useState<boolean>(false);
  const nextBtnEl = document.querySelector('.next-btn') as HTMLElement | null;
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => ({
      ...prev,
      progress: 'pw',
      email: email.value,
    }));
  };
  const sendVerificationEmail: () => Promise<ResultOfEmailAPI> = async () => {
    let result: ResultOfEmailAPI = {
      type: 'duplicate',
    };
    try {
      const response = await axios.post('', { email: email });
      if (response.status === 200) {
        result = { type: 'success' };
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log('axios error', axiosError);
        const msg = axiosError.response.statusText;
        if (msg.includes('가입')) {
          //중복 이메일
          result = { type: 'duplicate' };
        }
        if (msg.includes('5분')) {
          //5분간 이메일 전송 금지
          result = { type: 'pause' };
        }
        if (msg.includes('초과')) {
          // 하루 인증 횟수 초과
          result = { type: 'overSending' };
        }
        if (msg.includes('에러')) {
          // 알 수 없는 서버 에러
          result = { type: 'serverError', msg: axiosError.message };
        }
      } else {
        result = { type: 'serverError', msg: axiosError.message };
      }
    }

    return result;
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
      <StepInner
        disableBtn={disableBtn}
        onClickNextBtn={onClickNextBtn}
        isNextBtnHidden={!openAuthNumberForm}
      >
        <EmailVerification
          additionOfLabel="로그인을 위한"
          setDisableBtn={setDisableBtn}
          email={email}
          setEmail={setEmail}
          openAuthNumberForm={openAuthNumberForm}
          setOpenAuthNumberForm={setOpenAuthNumberForm}
          toastModalPositionTargetEl={nextBtnEl}
          sendVerificationEmail={sendVerificationEmail}
        />
      </StepInner>
    </div>
  );
};

export default SignUpEmail;
