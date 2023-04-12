import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';

import { EmailVerification } from '@/components';
import { ResultOfEmailAPI } from '@/components/EmailVerification/types';

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
  const sendVerificationEmail = async (): Promise<ResultOfEmailAPI> => {
    const result: ResultOfEmailAPI = {
      type: 'success',
    };
    //[api ]
    // try {
    //   const response = await axios.post('', { email: email });
    //   if (response.status === 200) {
    //     result = { type: 'success' };
    //   }
    // } catch (error) {
    //   const axiosError = error as AxiosError;
    //   if (axiosError.response) {
    //     console.log('axios error', axiosError);
    //     const msg = axiosError.response.statusText;
    //     if (msg.includes('가입')) {
    //       //중복 이메일
    //       result = { type: 'duplicate' };
    //     }
    //     if (msg.includes('5분')) {
    //       //5분간 이메일 전송 금지
    //       result = { type: 'pause' };
    //     }
    //     if (msg.includes('초과')) {
    //       // 하루 인증 횟수 초과
    //       result = { type: 'overSending' };
    //     }
    //     if (msg.includes('에러')) {
    //       // 알 수 없는 서버 에러
    //       result = { type: 'serverError', msg: axiosError.message };
    //     }
    //   } else {
    //     result = { type: 'serverError', msg: axiosError.message };
    //   }
    // }

    return result;
  };
  useEffect(() => {
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.email as SignUpSessionDataKeyType,
      setEmail,
      undefined,
      undefined,
    );
    if (signUpState.email) {
      setEmail({
        value: signUpState.email,
        errorMsg: null,
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
