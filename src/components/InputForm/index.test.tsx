import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi } from 'vitest';

import { checkRegex } from '@/functions/regex';
import { XSSCheck } from '@/functions/xssCheck';
import {
  ERROR_MSG,
  InputDataType,
  InputFormIdType,
  TestResultType,
} from '@/pages/SignUp/signUpTypes';

import InputForm, { INPUT_FORM_LABEL, INPUT_FORM_PLACE_HOLDER, InputFormProps } from '.';

configure({ adapter: new Adapter() });

describe('InputForm', () => {
  const setStateMock = vi.fn();
  const useStateMock: any = (useState: InputDataType) => [useState, setStateMock];
  vi.spyOn(React, 'useState').mockImplementation(useStateMock);
  const props: InputFormProps = {
    id: 'email',
    data: { value: '' },
    setData: setStateMock,
    additionOfLabel: undefined,
    disabled: false,
  };
  const wrapper = shallow(<InputForm {...props} />);
  const inputEl = wrapper.find('input');
  const idArray: InputFormIdType[] = ['email', 'pw', 'name', 'nickName'];
  it('should render InputForm', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('id가 email일 경우, 작성 전에 이메일의 형식에 대한 안내 문구를 보여줌', () => {
    const emailFormEl = wrapper.find('.info-email-form');
    expect(emailFormEl.exists()).toBe(true);
    expect(emailFormEl.text()).toEqual("'@'을 포함하여 작성해주세요.");
  });
  it(`미입력 상태로 input창을 벗어날 경우 ${ERROR_MSG.required} 보여줌`, () => {
    wrapper.setProps({ data: { value: '', errorType: 'required' } });
    wrapper.update();
    inputEl.simulate('blur');
    const errorMsg = wrapper.find('.error-msg').text();
    expect(errorMsg).toBe(ERROR_MSG.required);
  });
  it('InputForm을 통해 data 변경할 수 있고 XSS 공격 방어', () => {
    const value = '<>test';
    inputEl.simulate('change', { target: { value: value } });
    const newValue = XSSCheck(value, undefined);
    wrapper.setProps({ data: { value: newValue } });
    expect(props.setData).toBeCalledWith(expect.objectContaining({ value: newValue }));
    wrapper.update();
    expect(wrapper.find('input').prop('value')).toEqual('test');
  });
  it('data 대한 적합한 placeholder, label 보여줌', () => {
    for (const i of idArray) {
      wrapper.setProps({ id: i });
      wrapper.update();
      if (i !== 'confirmPw') {
        expect(wrapper.find('label').text().includes(INPUT_FORM_LABEL[i])).toBe(true);
      }
      expect(wrapper.find('input').prop('placeholder')).toBe(INPUT_FORM_PLACE_HOLDER[i]);
    }
  });
  const testRegex = (id: InputFormIdType, testValue: string, expectedError?: string) => {
    const testResult: TestResultType = checkRegex(testValue, id);
    wrapper.setProps({
      data: { value: testValue, errorType: testResult === 'pass' ? undefined : testResult },
    });
    wrapper.update();
    if (testResult !== 'pass' && expectedError) {
      expect(wrapper.find('.error-msg').text()).toBe(expectedError);
    } else {
      expect(wrapper.find('.error-msg').exists()).toBe(false);
    }
  };
  it('이메일에 대한 유효성 검사와 검사 결과 보여줌', () => {
    wrapper.setProps({ id: 'email' });
    const wrongValueArray = ['email', 'email@', 'email@aa', 'email@test.comm', '_email@test.com'];
    const testArray = [
      ...wrongValueArray,
      'email@test.co',
      'email@test.com',
      'email_test@test.com',
    ];
    for (const i of testArray) {
      const expectedError = wrongValueArray.includes(i) ? ERROR_MSG.invalidEmail : undefined;
      testRegex('email', i, expectedError);
    }
  });
  it('이름에 대한 유효성 검사와 검사 결과 보여줌', () => {
    wrapper.setProps({ id: 'name' });
    const wrongValueArray = ['a', 'a'.repeat(21), 'a!!', '123', 'a12', ' a'];
    const testArray = [...wrongValueArray, 'aa', '이름', '이름test'];
    for (const i of testArray) {
      const expectedError = wrongValueArray.includes(i) ? ERROR_MSG.invalidName : undefined;
      testRegex('name', i, expectedError);
    }
  });
  it('닉네임에 대한 유효성 검사와 검사 결과 보여줌', () => {
    wrapper.setProps({ id: 'nickName' });
    const wrongValueArray = ['a', 'a'.repeat(11), 'a!!', ' 닉네임'];
    const testArray = [...wrongValueArray, 'Test', '닉네임', '1234', '닉네임test'];
    for (const i of testArray) {
      const expectedError = wrongValueArray.includes(i) ? ERROR_MSG.invalidNickName : undefined;
      testRegex('nickName', i, expectedError);
    }
  });
  it('비밀번호에 대한 유효성 검사와 검사 결과 보여줌', () => {
    wrapper.setProps({ id: 'pw' });
    const wrongValueArray = [
      'a',
      'a'.repeat(8),
      '1'.repeat(8),
      '!'.repeat(8),
      'a1'.repeat(4),
      'test1#'.repeat(2),
      'test1!'.repeat(4),
      'test 1!'.repeat(2),
    ];
    const testArray = [...wrongValueArray, 'test123!!Test', '!123test^'];
    for (const i of testArray) {
      const expectedError = wrongValueArray.includes(i) ? ERROR_MSG.invalidPw : undefined;
      testRegex('pw', i, expectedError);
    }
  });
  it('비밀번호에 대한 유효성 검사 통과 여부에 따라 pw__check-icon 색상 변경됨', () => {
    wrapper.setProps({ id: 'pw' });
    wrapper.setProps({ data: { value: 'test!1234', errorType: undefined } });
    wrapper.update();
    expect(wrapper.find('.pw__check-icon').hasClass('on')).toBe(true);

    wrapper.setProps({ data: { value: 'wrongpassword', errorType: 'invalidPw' } });
    wrapper.update();
    expect(wrapper.find('.pw__check-icon').hasClass('on')).toBe(false);
  });
  it('props 중 disabled를 이용해 input의 disabled 변경 가능', () => {
    expect(wrapper.find('input').prop('disabled')).toEqual(props.disabled);
    wrapper.setProps({ disabled: true });
    wrapper.update();
    expect(wrapper.find('input').prop('disabled')).toEqual(true);
  });
  it('비밀번호에 대한 input의 기본 type은 password 이고 나머지의 기본 타입은 text', () => {
    for (const i of idArray) {
      wrapper.setProps({ id: i });
      wrapper.update();
      const type = i === 'pw' || i === 'confirmPw' ? 'password' : 'text';
      expect(wrapper.find('input').prop('type')).toEqual(type);
    }
  });
});
