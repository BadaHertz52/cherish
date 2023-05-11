import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CheckIcon from '@/assets/svgs/password-check.svg';
import BtnShowPw from '@/components/BtnShowPw';
import { checkRegex } from '@/functions/regex';
import { XSSCheck } from '@/functions/xssCheck';
import {
  ERROR_MSG,
  INPUT_FORM_ID,
  InputDataType,
  InputFormIdType,
} from '@/pages/SignUp/signUpTypes';
import './style.scss';
// ⚠️InputFormIdType 과 placeholder, label 의 property명은 동일 해야함
export const INPUT_FORM_PLACE_HOLDER = {
  name: '이름 (2-20자 영문,한글 사용 가능)',
  nickName: '닉네임 (3-10자 영문,한글,숫자 사용 가능)',
  email: '이메일',
  pw: '비밀번호 (8-20자 영문,숫자,특수문자(!,@,^) 조합)',
  confirmPw: '비밀번호 확인',
};
export const INPUT_FORM_LABEL = {
  name: '이름을 입력해주세요.',
  nickName: '닉네임을 입력해주세요.',
  email: '이메일을 입력해주세요.',
  pw: '비밀번호를 입력해주세요',
};

/**
 * name, nickName, email,pw의 유효성을 검사하는 함수
 * @param text
 * @returns  검사 결과
 */
export type InputFormProps = {
  id: InputFormIdType;
  data: InputDataType;
  setData: Dispatch<SetStateAction<InputDataType>>;
  additionOfLabel?: string;
  disabled?: boolean;
  prevPw?: string;
};
/**
 *
 * @param id : input의 id, name , placeholder, label 을 정하는데 사용
 * @param data: input의 value
 * @param setData: input의 change event 시 해당 event의 value에 따라 data의 상태를 변경
 * @returns
 */
const InputForm = ({ id, data, setData, additionOfLabel, disabled, prevPw }: InputFormProps) => {
  const [hiddenPw, setHiddenPw] = useState<boolean>(true);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = XSSCheck(event.target.value, undefined);
    //유효성 검사
    if (text === '') {
      setData({
        value: text,
      });
    } else {
      if (prevPw && prevPw === text) {
        setData({
          value: text,
          errorType: 'samePw',
        });
      } else {
        const testResult = checkRegex(text, id);
        setData({
          value: text,
          errorType: testResult === 'pass' ? undefined : testResult,
        });
      }
    }
  };
  const handleBlur = () => {
    if (!data.value) {
      setData({
        ...data,
        errorType: 'required',
      });
    }
  };
  return (
    <div id={`inputForm-${id}`} className="input-form">
      {id !== 'confirmPw' && (
        <label htmlFor={`input-${id}`}>
          {additionOfLabel && <span>{additionOfLabel} &nbsp;</span>}
          <span>{INPUT_FORM_LABEL[id]}</span>
          {id === 'email' && window.location.pathname === '/signup' && (
            <div className="email-form-alert">이메일은 회원가입 후 변경하실 수 없어요.</div>
          )}
        </label>
      )}

      <input
        type={
          !hiddenPw || (id !== INPUT_FORM_ID.pw && id !== INPUT_FORM_ID.confirmPw)
            ? 'text'
            : 'password'
        }
        id={`input-${id}`}
        name={`data-${id}`}
        placeholder={INPUT_FORM_PLACE_HOLDER[id]}
        value={data.value}
        disabled={disabled}
        onChange={event => handleChange(event)}
        onBlur={handleBlur}
      />
      {(id == INPUT_FORM_ID.pw || id == INPUT_FORM_ID.confirmPw) && (
        <>
          <BtnShowPw hiddenPw={hiddenPw} setHiddenPw={setHiddenPw} />
          <div className={`pw__check-icon ${data.value && !data.errorType ? 'on' : ''}`}>
            <CheckIcon />
          </div>
        </>
      )}
      <div className="input-form__msg">
        {data.errorType ? (
          <p className="error-msg">{ERROR_MSG[data.errorType]}</p>
        ) : (
          id === INPUT_FORM_ID.email &&
          !data.value && <p className="info-email-form">'@'을 포함하여 작성해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(InputForm);
