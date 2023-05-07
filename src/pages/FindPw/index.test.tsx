import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Router from 'react-router';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { onFindPw } from '@/api/auth/findPwAPI';
import { APIResult } from '@/api/auth/types';
import { EmailVerification, PasswordForm } from '@/components';

import { INPUT_FORM_ID } from '../SignUp/signUpTypes';

import FindPwContents, { FindPwContentsProps } from './component/FindPwContents';

import FindPw from '.';

configure({ adapter: new Adapter() });
vi.mock('axios');
describe('FindPw', () => {
  it('FindPw 렌더링', () => {
    render(
      <BrowserRouter>
        <FindPw />
      </BrowserRouter>,
    );
    const findPw = screen.getByText('비밀번호 찾기');
    expect(findPw).not.toBe(null);
    expect(findPw).not.toBe(undefined);
  });
  it('btn-prev 클릭 시, openAuthNumberForm이 false 일 경우 로그인 페이지로 이동', () => {
    render(
      <BrowserRouter>
        <FindPw />
      </BrowserRouter>,
    );
    const btnPrev = screen.getByRole('button', { name: 'btn-prev' });
    fireEvent.click(btnPrev);
    const mockedUsedNavigate = vi.fn();
    vi.spyOn(Router, 'useNavigate').mockImplementation(mockedUsedNavigate);
    //expect(useNavigate).toBeCalled();
  });
  //FindPwContents
  const props: FindPwContentsProps = {
    openEmailForm: true,
    setOpenEmailForm: vi.fn(),
    openAuthNumberForm: false,
    setOpenAuthNumberForm: vi.fn(),
  };
  const wrapper = shallow(<FindPwContents {...props} />);
  it('openEmailForm가 true일때 이메일 작성 폼이 열리지만 비밀번호 작성 폼은 열리지 않음', () => {
    expect(wrapper.find(EmailVerification).exists()).toBeTruthy();
    expect(wrapper.find(PasswordForm).exists()).not.toBeTruthy();
  });
  it('openEmailForm가 false일때 비밀번호 작성 폼은 열리지만 이메일 작성 폼은 열리지 않음', () => {
    wrapper.setProps({ openEmailForm: false });
    wrapper.update();
    expect(wrapper.find(EmailVerification).exists()).not.toBeTruthy();
    expect(wrapper.find(PasswordForm).exists()).toBeTruthy();
  });
  it('비밀번호, 비밀번호 입력을 올바르게 적었을 경우, 비밀번호 변경 버튼 활성화', async () => {
    const pw = 'newpassword12!';
    const passwordInput = wrapper.find(PasswordForm).dive().find(`#${INPUT_FORM_ID.pw}`);
    passwordInput.simulate('change', { target: { value: pw } });
    const confirmPasswordInput = wrapper
      .find(PasswordForm)
      .dive()
      .find(`#${INPUT_FORM_ID.confirmPw}`);
    confirmPasswordInput.simulate('change', { target: { value: pw } });
    render(
      <FindPwContents
        openEmailForm={false}
        setOpenEmailForm={vi.fn()}
        openAuthNumberForm={false}
        setOpenAuthNumberForm={vi.fn()}
      />,
    );
    const btn = screen.getByText('비밀번호 변경');
    expect(btn.getAttribute('disabled')).toBeFalsy();
  });
  //[to do :axios]
  // it('비밀번호 변경 성공 시 toast modal 열림', async () => {
  //   render(
  //     <FindPwContents
  //       openEmailForm={false}
  //       setOpenEmailForm={vi.fn()}
  //       openAuthNumberForm={false}
  //       setOpenAuthNumberForm={vi.fn()}
  //     />,
  //   );
  //   const btn = screen.getByText('비밀번호 변경');
  //   expect(btn.getAttribute('disabled')).toBeFalsy();
  // });
});
