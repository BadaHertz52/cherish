import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import InputForm from './InputForm';
import { ERROR_MSG, InputDataType } from './signUpTypes';
import StepInner from './StepInner';

const PassWord = () => {
  const { setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [pw, setPw] = useState<InputDataType>({ value: '', errorMsg: null });
  const [confirmPw, setConfirmPw] = useState<InputDataType>({ value: '', errorMsg: null });
  const onClickNextBtn = () => {};

  useEffect(() => {
    if (confirmPw.value !== '') {
      const pwEl = document.querySelector('#input-pw') as HTMLInputElement | null;
      if (pwEl?.value !== confirmPw.value && confirmPw.errorMsg === null) {
        setConfirmPw((prev: InputDataType) => {
          const newState: InputDataType = {
            ...prev,
            errorMsg: ERROR_MSG.invalidConfirmPw,
          };
          return newState;
        });
      }
    }
  }, [pw]);
  return (
    <div id="passWord">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <InputForm id="pw" data={pw} setData={setPw} />
        <InputForm id="confirmPw" data={confirmPw} setData={setConfirmPw} />
      </StepInner>
    </div>
  );
};

export default PassWord;
