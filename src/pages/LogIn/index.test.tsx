import { ChangeEvent } from 'react';

import { act } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'ts-sinon';
import { describe, expect, it } from 'vitest';

import { BtnShowPw } from '@/components';

import LogIn from '.';

configure({ adapter: new Adapter() });

describe('LogIn', () => {
  let wrapper = shallow(<LogIn />);

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

  it('should toggle keepLogin state on change of checkbox', () => {
    const checkbox = wrapper.find('#checkboxKeep');
    checkbox.simulate('change');
    expect(wrapper.state('keepLogin')).toBe(true);
    checkbox.simulate('change');
    expect(wrapper.state('keepLogin')).toBe(false);
  });

  it('should call sendLogInData function on click of login button', () => {
    const sendLogInDataSpy = sinon.spy(wrapper.instance() as any, 'sendLogInData');
    const loginBtn = wrapper.find('button.btn-log-in');
    loginBtn.simulate('click');
    expect(sendLogInDataSpy.called).toBe(true);
  });

  it('should call onClickSignUpBtn to move findpw  page on click of sign up button', () => {
    const btnSignUp = wrapper.find('.btn-sign-up');
    const onClickSignUpBtn = sinon.spy(wrapper.instance() as any, 'onClickSignUpBtn');
    btnSignUp.simulate('click');
    expect(onClickSignUpBtn.called).toBe(true);
    expect(window.location.pathname).toEqual('/signup');
  });
  it('should change window.location.pathname to /findpw when click link-find-pw', () => {
    const link = wrapper.find('.link-find-pw');
    link.simulate('click');
    expect(window.location.pathname).toEqual('/findpw');
  });
  it('should set error state to true when email input value is invalid', () => {
    const loginBtn = wrapper.find('button.btn-log-in');
    const emailInput = wrapper.find('/log-in__data__email input');
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
    expect(wrapper.find('.error-message').text()).include('이메일 또는 비밀번호를 잘못 입력했어요');

    emailInput.simulate('change', {
      target: {
        value: 'test@test.com',
      },
    } as ChangeEvent<HTMLInputElement>);
    passwordInput.simulate('change', {
      target: {
        value: '123qwerd!s',
      },
    } as ChangeEvent<HTMLInputElement>);
    loginBtn.simulate('click');
    expect(wrapper.find('.error-message').text()).toEqual('');
  });
  it('should display "다시 로그인 하세요" text when reLogIn is true', () => {
    act(() => {
      sessionStorage.setItem('reLogIn', 'true');
    });

    wrapper = wrapper.update().dive();

    expect(wrapper.find('.message').text()).toEqual('다시 로그인 하세요');
  });

  it('should not display "다시 로그인 하세요" text when reLogIn is false', () => {
    act(() => {
      sessionStorage.setItem('reLogIn', 'false');
    });

    wrapper = wrapper.update().dive();

    expect(wrapper.find('.message').length).toBe(0);
  });
});
