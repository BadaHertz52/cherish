import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { ERROR_MSG, InputDataType, InputFormIdType, TestResultType } from './signUpTypes';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BtnShowPw from '../../btnShowPw';
import { XSSCheck } from '../../logIn';

type InputFormProps = {
  id: InputFormIdType;
  data: InputDataType;
  setData: Dispatch<SetStateAction<InputDataType>>;
};
/**
 *
 * @param id : input의 id, name , placeholder, label 을 정하는데 사용
 * @param data: input의 value
 * @param setData: input의 change event 시 해당 event의 value에 따라 data의 상태를 변경
 * @returns
 */
const InputForm = ({ id, data, setData }: InputFormProps) => {
  const [showPw, setShowPw] = useState<boolean>(false);
  // ⚠️InputFormIdType 과 placeholder, label 의 property명은 동일 해야함
  const placeholder = {
    name: '이름',
    nickName: '닉네임',
    email: '이메일',
    pw: '비밀번호',
    confirmPw: '비밀번호 확인',
  };
  const label = {
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
    pw: new RegExp('^[a-zA-Z0-9!@^]{8,20}$'),
  };
  /**
   * name, nickName, email,pw의 유효성을 검사하는 함수
   * @param text
   * @returns  검사 결과
   */
  const checkRegex = (text: string): TestResultType => {
    let result: TestResultType = 'pass';
    switch (id) {
      case 'name':
        result = REGEX.name.test(text) ? 'pass' : 'invalidName';
        break;
      case 'nickName':
        result = REGEX.nickName.test(text) ? 'pass' : 'invalidNickName';
        break;
      case 'email':
        result = REGEX.email.test(text) ? 'pass' : 'invalidEmail';
        break;
      case 'pw':
        result = REGEX.pw.test(text) ? 'pass' : 'invalidPw';
        break;
      case 'confirmPw':
        const inputPwEl = document.querySelector('#input-pw') as HTMLInputElement | null;
        result = inputPwEl?.value === text ? 'pass' : 'invalidConfirmPw';
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
        errorMsg: null,
      });
    } else {
      const testResult = checkRegex(text);
      setData({
        value: text,
        errorMsg: testResult === 'pass' ? null : ERROR_MSG[`${testResult}`],
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
      {id !== 'confirmPw' && <label htmlFor={`input-${id}`}>{label[`${id}`]}</label>}
      <input
        type={showPw || (id !== 'pw' && id !== 'confirmPw') ? 'text' : 'password'}
        id={`input-${id}`}
        name={`data-${id}`}
        placeholder={placeholder[`${id}`]}
        value={data.value}
        onChange={event => handleChange(event)}
        onBlur={handleBlur}
      />
      {(id == 'pw' || id == 'confirmPw') && (
        <>
          <BtnShowPw showPw={showPw} setShowPw={setShowPw} />
          <div className="pw__check-icon">
            <FontAwesomeIcon
              className={`${data.value !== '' && data.errorMsg === null ? 'on' : ''}`}
              icon={faCheck}
            />
          </div>
        </>
      )}
      <div className={`error-msg ${id == 'email' && data.value === '' ? 'email' : ''}`}>
        {id === 'email' &&
          (data.value === ''
            ? `'@'을 포함하여 작성해주세요.`
            : data.errorMsg !== null
            ? data.errorMsg
            : '')}
        {id !== 'email' && (data.errorMsg !== null ? data.errorMsg : '')}
      </div>
    </div>
  );
};

export default React.memo(InputForm);
