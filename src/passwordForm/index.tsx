import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import InputForm from '../inputForm/index';
import { ERROR_MSG, InputDataType } from '../signup/components/signUpTypes';
import './style.scss';
type PasswordFormProps = {
  confirmPw: InputDataType;
  setConfirmPw: Dispatch<SetStateAction<InputDataType>>;
  pw: InputDataType;
  setPw: Dispatch<SetStateAction<InputDataType>>;
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
};
const PasswordForm = ({ confirmPw, setConfirmPw, pw, setPw, setDisableBtn }: PasswordFormProps) => {
  //pw, confirmPw 의 변화에 따라 disableBtn 상태 변경
  useEffect(() => {
    if (confirmPw.value !== '' && pw.value !== '') {
      if (pw.value !== confirmPw.value && confirmPw.errorMsg === null) {
        setConfirmPw((prev: InputDataType) => ({
          ...prev,
          errorMsg: ERROR_MSG.invalidConfirmPw,
        }));
      }
      if (pw.value === confirmPw.value && pw.errorMsg === null) {
        setConfirmPw(prev => ({
          ...prev,
          errorMsg: null,
        }));
      }
      if (pw.value === confirmPw.value && pw.errorMsg === null && confirmPw.errorMsg === null) {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    }
  }, [pw, confirmPw]);
  return (
    <div className="pw-form">
      <InputForm id="pw" data={pw} setData={setPw} />
      <InputForm id="confirmPw" data={confirmPw} setData={setConfirmPw} />
    </div>
  );
};

export default PasswordForm;
