import { ChangeEvent } from 'react';

import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { describe, expect, it, vi } from 'vitest';

import { LOG_IN_API_ITEM_KEY } from '@/api/auth/logIn';
import { BtnShowPw } from '@/components';

import LogIn from '.';

configure({ adapter: new Adapter() });

describe('LogIn', () => {
  const wrapper = shallow(<LogIn />);
  const sessionStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });
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
    const removeBtn = wrapper.find('button[title="button to remove email"]');
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
    const errorMsg = wrapper.find('.error-msg').text();
    expect(errorMsg.includes('이메일 또는 비밀번호를 잘못 입력했어요.')).toBe(true);
  });

  it('should display "결제정보 입력 없이 1분만에 회원가입하세요!" text ', () => {
    const banner = wrapper.find('.banner div').text();
    expect(banner).toEqual('결제정보 입력 없이 1분만에 회원가입하세요!');
  });
  it('로그인 만료로 로그인 페이지로 이동 하면, 재로그인에 대한 메세지 보여줌', () => {
    window.sessionStorage.setItem(LOG_IN_API_ITEM_KEY.reLogIn, 'true');
    const newWrapper = shallow(<LogIn />);
    const banner = newWrapper.find('.banner div').text();
    expect(banner).toEqual('다시 로그인 해주세요.');
  });
});
