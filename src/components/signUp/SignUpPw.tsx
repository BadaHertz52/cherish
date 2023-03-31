import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import InputForm from './InputForm';
import { ERROR_MSG, InputDataType, SignUpStateType } from './signUpTypes';
import StepInner from './StepInner';

const SignUpPw = () => {
  const { setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [pw, setPw] = useState<InputDataType>({ value: '', errorMsg: null });
  const [confirmPw, setConfirmPw] = useState<InputDataType>({ value: '', errorMsg: null });
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

  useEffect(() => {
    if (confirmPw.value !== '' && pw.value !== '') {
      if (pw.value !== confirmPw.value && confirmPw.errorMsg === null) {
        setConfirmPw((prev: InputDataType) => {
          const newState: InputDataType = {
            ...prev,
            errorMsg: ERROR_MSG.invalidConfirmPw,
          };
          return newState;
        });
      }
      if (pw.value === confirmPw.value && pw.errorMsg === null && confirmPw.errorMsg === null) {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    }
  }, [pw, confirmPw]);
  return (
    <div id="sign-up__pw">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <InputForm id="pw" data={pw} setData={setPw} />
        <InputForm id="confirmPw" data={confirmPw} setData={setConfirmPw} />
      </StepInner>
    </div>
  );
};

export default SignUpPw;
