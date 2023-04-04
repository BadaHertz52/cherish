import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '..';
import InputForm from './InputForm';
import { getPrevData } from './SignUpTopBar';
import { ERROR_MSG, InputDataType, SignUpStateType, initialInputData } from './signUpTypes';
import StepInner from './StepInner';

const Pw = () => {
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
  //pw, confirmPw 의 변화에 따라 disableBtn 상태 변경
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
  //sessiongStorage, signUpState 내용 가져오기
  useEffect(() => {
    getPrevData('pw', setPw, null, null);
    getPrevData('confirmPw', setConfirmPw, null, null);
  }, []);
  return (
    <div id="pw">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <InputForm id="pw" data={pw} setData={setPw} />
        <InputForm id="confirmPw" data={confirmPw} setData={setConfirmPw} />
      </StepInner>
    </div>
  );
};

export default Pw;
