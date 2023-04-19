import { ChangeEvent } from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { describe, expect, it } from 'vitest';

import { BtnShowPw } from '@/components';

import LogIn from '.';

configure({ adapter: new Adapter() });

describe('LogIn', () => {
  const wrapper = shallow(<LogIn />);

  it('should render LogIn component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should set email state on input change  and check XSS', () => {
    const input = wrapper.find('.log-in__data__email input');
    input.simulate('change', {
      target: {
        value: 'test>@test.com',
      },
    } as ChangeEvent<HTMLInputElement>);
    const changedInput = wrapper.find('.log-in__data__email input');
    const value = changedInput.prop('value');
    expect(value).toEqual('test@test.com');
  });

  it('should set password state on input change  and check XSS', () => {
    const input = wrapper.find('.log-in__data__pw input');
    input.simulate('change', {
      target: {
        value: '<test1234',
      },
    } as ChangeEvent<HTMLInputElement>);
    const changedInput = wrapper.find('.log-in__data__pw input');
    const value = changedInput.prop('value');
    expect(value).toEqual('test1234');
  });
  it('should change type of input for pw when click btn-show-pw', () => {
    const btn = wrapper.find(BtnShowPw).dive().find('.btn-show-pw');
    btn.simulate('click');
    expect(wrapper.find('.log-in__data__pw input').prop('type')).toEqual('text');
    const btnOn = wrapper.find(BtnShowPw).dive().find('.btn-show-pw.on');
    btnOn.simulate('click');
    expect(wrapper.find('.log-in__data__pw input').prop('type')).toEqual('password');
  });

  it('should call handleClickRemoveBtn on click of remove email button', () => {
    const removeBtn = wrapper.find('button[title="btn-remove-email"]');
    removeBtn.simulate('click');
    const input = wrapper.find('.log-in__data__email input');
    expect(input.prop('value')).toEqual('');
  });

  it('should change window location pathname to /findpw when clicked link-find-pw', () => {
    const link = wrapper.find('.link-find-pw');
    expect(link.prop('to')).toEqual('/findpw');
  });
  it('should change window location pathname to /signup when clicked link-find-pw', () => {
    const link = wrapper.find('.link-sign-up');
    expect(link.prop('to')).toEqual('/signup');
  });

  it('should set error state to true when email input value is invalid', () => {
    const loginBtn = wrapper.find('.btn-log-in');
    const emailInput = wrapper.find('.log-in__data__email input');
    const passwordInput = wrapper.find('.log-in__data__pw input');
    emailInput.simulate('change', {
      target: {
        value: 'test@test',
      },
    } as ChangeEvent<HTMLInputElement>);
    passwordInput.simulate('change', {
      target: {
        value: '123qwerd',
      },
    } as ChangeEvent<HTMLInputElement>);
    loginBtn.simulate('click');
    const errorMsg = wrapper.find('.error-msg p').at(0).text();
    expect(errorMsg).toEqual('이메일 또는 비밀번호를 잘못 입력했어요.');
  });

  it('should display "결제정보 입력 없이 1분만에 회원가입하세요!" text ', () => {
    const banner = wrapper.find('.banner div').text();
    expect(banner).toEqual('결제정보 입력 없이 1분만에 회원가입하세요!');
  });
});
