import { Dispatch, SetStateAction, useEffect } from 'react';

import { INPUT_FORM_ID, InputDataType, InputFormIdType } from '@/pages/SignUp/signUpTypes';

import InputForm from '../InputForm/index';
import './style.scss';
type PasswordFormProps = {
  additionOfLabel?: string; //InputForm의 additionOfLabel
  confirmPw: InputDataType;
  setConfirmPw: Dispatch<SetStateAction<InputDataType>>;
  pw: InputDataType;
  setPw: Dispatch<SetStateAction<InputDataType>>;
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
};
const PasswordForm = ({
  additionOfLabel,
  confirmPw,
  setConfirmPw,
  pw,
  setPw,
  setDisableBtn,
}: PasswordFormProps) => {
  //pw, confirmPw 의 변화에 따라 disableBtn 상태 변경
  useEffect(() => {
    if (confirmPw.value && pw.value) {
      if (pw.value !== confirmPw.value && !confirmPw.errorType) {
        setConfirmPw((prev: InputDataType) => ({
          ...prev,
          errorType: 'invalidConfirmPw',
        }));
      }
      if (pw.value === confirmPw.value && !pw.errorType) {
        setConfirmPw(prev => ({
          ...prev,
          errorType: undefined,
        }));
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    }
  }, [pw.value, confirmPw.value]);
  return (
    <div className="pw-form">
      <InputForm
        additionOfLabel={additionOfLabel}
        id={INPUT_FORM_ID.pw as InputFormIdType}
        data={pw}
        setData={setPw}
      />
      <InputForm
        additionOfLabel={additionOfLabel}
        id={INPUT_FORM_ID.confirmPw as InputFormIdType}
        data={confirmPw}
        setData={setConfirmPw}
      />
    </div>
  );
};

export default PasswordForm;
