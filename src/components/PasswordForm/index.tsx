import { Dispatch, SetStateAction, useEffect } from 'react';
import InputForm from '../InputForm/index';
import { ERROR_MSG, InputDataType } from '@/pages/SignUp/signUpTypes';
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
      <InputForm additionOfLabel={additionOfLabel} id="pw" data={pw} setData={setPw} />
      <InputForm
        additionOfLabel={additionOfLabel}
        id="confirmPw"
        data={confirmPw}
        setData={setConfirmPw}
      />
    </div>
  );
};

export default PasswordForm;
