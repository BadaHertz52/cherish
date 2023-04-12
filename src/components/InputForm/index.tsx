import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BtnShowPw from '@/components/BtnShowPw';
import { XSSCheck } from '@/pages/LogIn';
import {
  ERROR_MSG,
  ERROR_TYPE,
  INPUT_FORM_ID,
  InputDataType,
  InputFormIdType,
  TestResultType,
} from '@/pages/SignUp/signUpTypes';
import './style.scss';
type InputFormProps = {
  id: InputFormIdType;
  data: InputDataType;
  setData: Dispatch<SetStateAction<InputDataType>>;
  additionOfLabel?: string;
  disabled?: boolean;
};
/**
 *
 * @param id : input의 id, name , placeholder, label 을 정하는데 사용
 * @param data: input의 value
 * @param setData: input의 change event 시 해당 event의 value에 따라 data의 상태를 변경
 * @returns
 */
const InputForm = ({ id, data, setData, additionOfLabel, disabled }: InputFormProps) => {
  const [hiddenPw, setHiddenPw] = useState<boolean>(true);
  // ⚠️InputFormIdType 과 placeholder, label 의 property명은 동일 해야함
  const PLACE_HOLDER = {
    name: '이름 (2-20자 영문,한글 사용 가능)',
    nickName: '닉네임 (3-10자 영문,한글,숫자 사용 가능)',
    email: '이메일',
    pw: '비밀번호 (8-20자 영문,숫자,특수문자(!,@,^) 조합)',
    confirmPw: '비밀번호 확인',
  };
  const LABEL = {
    name: '이름을 입력해주세요.',
    nickName: '닉네임을 입력해주세요.',
    email: '이메일을 입력해주세요.',
    pw: '비밀번호를 입력해주세요',
  };
  const REGEX = {
    //2~20자 (한글, 영문)
    name: new RegExp('^[ㄱ-ㅎ가-힣a-zA-Z]{2,20}$'),
    //3~10자 (한글, 영문, 숫자)
    nickName: new RegExp('^[ㄱ-ㅎ가-힣a-zA-Z0-9]{3,10}$'),
    email: new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    //8~20자 (영문 + 숫자 + 특수기호(!@^))
    pw: new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@^])[a-zA-z0-9!@^]{8,20}$'),
  };
  /**
   * name, nickName, email,pw의 유효성을 검사하는 함수
   * @param text
   * @returns  검사 결과
   */
  const checkRegex = (text: string): TestResultType => {
    let result: TestResultType = 'pass';
    switch (id) {
      case INPUT_FORM_ID.name:
        result = REGEX.name.test(text) ? 'pass' : ERROR_TYPE.invalidName;
        break;
      case INPUT_FORM_ID.nickName:
        result = REGEX.nickName.test(text) ? 'pass' : ERROR_TYPE.invalidNickName;
        break;
      case INPUT_FORM_ID.email:
        result = REGEX.email.test(text) ? 'pass' : ERROR_TYPE.invalidEmail;
        break;
      case INPUT_FORM_ID.pw:
        result = REGEX.pw.test(text) ? 'pass' : ERROR_TYPE.invalidPw;
        break;
      case INPUT_FORM_ID.confirmPw:
        const inputPwEl = document.querySelector('#input-pw') as HTMLInputElement | null;
        result = inputPwEl?.value === text ? 'pass' : ERROR_TYPE.invalidConfirmPw;
      default:
        break;
    }
    return result;
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = XSSCheck(event.target.value, undefined);
    //유효성 검사
    if (text === '') {
      setData({
        value: text,
      });
    } else {
      const testResult = checkRegex(text);
      setData({
        value: text,
        errorMsg: testResult === 'pass' ? undefined : ERROR_MSG[testResult],
      });
    }
  };
  const handleBlur = () => {
    if (data.value === '') {
      setData({
        ...data,
        errorMsg: ERROR_MSG.required,
      });
    }
  };
  return (
    <div id={`inputForm-${id}`} className="input-form">
      {id !== 'confirmPw' && (
        <label htmlFor={`input-${id}`}>
          {additionOfLabel && <span>{additionOfLabel} &nbsp;</span>}
          <span>{LABEL[id]}</span>
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
        placeholder={PLACE_HOLDER[id]}
        value={data.value}
        disabled={disabled}
        onChange={event => handleChange(event)}
        onBlur={handleBlur}
      />
      {(id == INPUT_FORM_ID.pw || id == INPUT_FORM_ID.confirmPw) && (
        <>
          <BtnShowPw hiddenPw={hiddenPw} setHiddenPw={setHiddenPw} />
          <div className={`pw__check-icon ${data.value && !data.errorMsg ? 'on' : ''}`}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </>
      )}
      <div className="error-msg">
        {data.errorMsg ? (
          <p>{data.errorMsg}</p>
        ) : (
          id === INPUT_FORM_ID.email &&
          !data.value && <p className="info-email-form"> '@'을 포함하여 작성해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(InputForm);
