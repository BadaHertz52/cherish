import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi } from 'vitest';

import { Timer } from '@/components';
import { ERROR_MSG, InputDataType } from '@/pages/SignUp/signUpTypes';

import AuthNumberForm from '.';

configure({ adapter: new Adapter() });

describe('AuthNumberForm', () => {
  const setStateMock = vi.fn();
  const useStateMock: any = (useState: InputDataType) => [useState, setStateMock];
  vi.spyOn(React, 'useState').mockImplementation(useStateMock);
  const props = {
    email: { value: 'test@email.coim' },
    authNumber: { value: '' },
    setAuthNumber: setStateMock,
    openTimer: true,
    setOpenTimer: vi.fn(),
    overTime: false,
    setOverTime: vi.fn(),
    setOpenToastModal: vi.fn(),
    setDisableBtn: vi.fn(),
    verifiedEmail: { current: undefined },
  };
  const wrapper = shallow(<AuthNumberForm {...props} />);
  const inputEl = wrapper.find('input');
  it('should render AuthNumberForm', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('input 에 입력시 XSS 막기, authNumber 값 변경', () => {
    const targetValue = '<>1234';
    inputEl.simulate('change', { target: { value: targetValue } });
    expect(props.setAuthNumber).toBeCalledWith(expect.objectContaining({ value: '1234' }));
  });
  it(`미입력 상태로 input창을 벗어날 경우, authNumber 값 변경과 ${ERROR_MSG.required} 보여줌`, () => {
    inputEl.simulate('blur');
    expect(props.setAuthNumber).toBeCalledWith(expect.objectContaining({ errorType: 'required' }));
    wrapper.setProps({ overTime: false });
    wrapper.setProps({ authNumber: { value: '', errorType: 'required' } });
    wrapper.update();
    const errorMsg = wrapper.find('.error-msg p').at(0).text();
    expect(errorMsg).toBe(ERROR_MSG.required);
  });
  it('openTimer의 값에 따라 Timer 보임', () => {
    expect(wrapper.find(Timer).exists()).toBe(true);
    wrapper.setProps({ openTimer: false });
    wrapper.update();
    expect(wrapper.find(Timer).exists()).toBe(false);
  });
  it('openTimer === true && authNumber.value 일때만 인증 확인 버튼 활성화', () => {
    wrapper.setProps({ openTimer: true });
    wrapper.setProps({ authNumber: { value: '111111' } });
    wrapper.update();
    expect(wrapper.find('.btn-authNumber').prop('disabled')).toBe(false);

    wrapper.setProps({ openTimer: true });
    wrapper.setProps({ authNumber: { value: '' } });
    wrapper.update();

    expect(wrapper.find('.btn-authNumber').prop('disabled')).toBe(true);
    wrapper.setProps({ openTimer: false });
    wrapper.setProps({ authNumber: { value: '111111' } });
    wrapper.update();

    expect(wrapper.find('.btn-authNumber').prop('disabled')).toBe(true);
  });
  it('인증 시간이 지났을 경우, "인증 시간이 지났습니다" 라는 메세지 보여줌', () => {
    wrapper.setProps({ overTime: true });
    wrapper.update();
    expect(wrapper.find('.msg-over-time').exists()).toBe(true);
  });
  it('인증 시간이 남아있을때, 잘못된 인증 번호를 입력 하면 이에 대한 오류 메세지 보여줌', () => {
    wrapper.setProps({ overTime: false });
    wrapper.setProps({ authNumber: { value: 'wrong number', errorType: 'invalidAuthNumber' } });
    wrapper.update();
    const errorMsg = wrapper.find('.error-msg');
    expect(errorMsg.exists()).toBe(true);
    expect(errorMsg.find('p').at(0).text()).toEqual(ERROR_MSG.invalidAuthNumber);
  });
  it('인증 시간이 남아있고, 인증 번호에 오류가 없을때  이메일 인증 관련 안내 사항 보여줌', () => {
    wrapper.setProps({ overTime: false });
    wrapper.setProps({ authNumber: { value: '', errorType: undefined } });
    wrapper.update();
    const errorMsg = wrapper.find('.alert');
    expect(errorMsg.exists()).toBe(true);
  });
  // [to do  인증 번호 api 연동]
});
