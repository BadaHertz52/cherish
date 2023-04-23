import { Dispatch, SetStateAction, ChangeEvent, MutableRefObject } from 'react';

import { onAuthNumber } from '@/api/auth/email';
import { APIResult, AuthNumberAPIParams } from '@/api/auth/types';
import { Timer } from '@/components';
import { XSSCheck } from '@/pages/LogIn';
import { ERROR_MSG, InputDataType } from '@/pages/SignUp/signUpTypes';

type AuthNumberFormProps = {
  email: InputDataType;
  authNumber: InputDataType;
  setAuthNumber: Dispatch<SetStateAction<InputDataType>>;
  openTimer: boolean;
  setOpenTimer: Dispatch<SetStateAction<boolean>>;
  overTime: boolean;
  setOverTime: Dispatch<SetStateAction<boolean>>;
  setOpenToastModal: Dispatch<SetStateAction<boolean>>;
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  verifiedEmail: MutableRefObject<string | undefined>;
  isInFindPw?: boolean;
};
const AuthNumberForm = ({
  email,
  authNumber,
  setAuthNumber,
  openTimer,
  setOpenTimer,
  overTime,
  setOverTime,
  setOpenToastModal,
  setDisableBtn,
  verifiedEmail,
  isInFindPw,
}: AuthNumberFormProps) => {
  const onChangeAuthNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const text = XSSCheck(event.target.value, undefined);
    setAuthNumber({
      value: text,
    });
  };
  const onClickAuthNumberBtn = async () => {
    //백엔드에 이메인 인증 번호 확인
    const params: AuthNumberAPIParams = {
      email: email.value,
      code: authNumber.value,
    };
    const result: APIResult = await onAuthNumber(params);
    //data는  string type으로
    if (result.success) {
      authNumber.errorType &&
        setAuthNumber(prev => ({
          ...prev,
          errorType: undefined,
        }));
      //서버에서 받은 인증 번호와 사용자가 입력한 인증 번호가 일치할 경우
      setOpenTimer(false);
      verifiedEmail.current = email.value;
      setOpenToastModal(true);
      if (isInFindPw) {
        setTimeout(() => {
          setDisableBtn(false);
          setOpenToastModal(false);
        }, 1000);
      } else {
        setDisableBtn(false);
      }
    } else {
      //인증 번호 불일치
      setAuthNumber(prev => ({
        ...prev,
        errorType: 'invalidAuthNumber',
      }));
    }
  };
  const handleBlurOfAuthNumber = () => {
    if (!authNumber.value) {
      setAuthNumber({
        ...authNumber,
        errorType: 'required',
      });
    }
  };
  return (
    <section className="authNumber-form">
      <label htmlFor="authNumber">인증 번호</label>
      <div className="authNumber-form__contents">
        <input
          id="authNumber"
          name="authNumber"
          value={authNumber.value}
          onChange={onChangeAuthNumber}
          onBlur={handleBlurOfAuthNumber}
          placeholder="인증번호(6자리)"
        />
        {openTimer && <Timer setOpenTimer={setOpenTimer} setOverTime={setOverTime} />}
        <button
          disabled={!(openTimer && authNumber.value)}
          className="btn-authNumber"
          type="button"
          onClick={onClickAuthNumberBtn}
        >
          확인
        </button>
      </div>

      <div className="msg">
        {overTime ? (
          <p className="msg-over-time">인증 시간이 지났습니다.</p>
        ) : authNumber.errorType ? (
          <div className="error-msg">
            <p>{ERROR_MSG[authNumber.errorType]}</p>
            <p>인증번호를 다시 확인해주세요.</p>
          </div>
        ) : (
          <div className="alert">
            <p>이메일이 수신되지 않는 경우, 입력하신 이메일이 정확한지 확인해 주세요.</p>
            <p>또는 스펨메일함과 메일함 용량을 확인해 주세요.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthNumberForm;
