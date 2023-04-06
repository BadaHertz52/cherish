import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '..';
import { getPrevData } from './SignUpTopBar';
import { InputDataType, SignUpStateType, initialInputData } from './signUpTypes';
import StepInner from './StepInner';
import PasswordForm from '@/components/PasswordForm';

const SignUpPw = () => {
  const { setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [pw, setPw] = useState<InputDataType>(initialInputData);
  const [confirmPw, setConfirmPw] = useState<InputDataType>(initialInputData);
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => {
      const newState: SignUpStateType = {
        ...prev,
        progress: 'genderAndBirth',
        pw: pw.value,
      };
      return newState;
    });
  };
  //sessionStorage, signUpState 내용 가져오기
  useEffect(() => {
    getPrevData('pw', setPw, null, null);
    getPrevData('confirmPw', setConfirmPw, null, null);
  }, []);
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
      </StepInner>
    </div>
  );
};

export default SignUpPw;
