import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { EmailVerification, PasswordForm } from '@/components';
import { INPUT_FORM_PLACE_HOLDER } from '@/components/InputForm';

import { INPUT_FORM_ID } from '../SignUp/signUpTypes';

import FindPwContents from './component/FindPwContents';
import FindPwTopBar from './component/FindPwTopBar';

import FindPw, { FindPwChildProps } from '.';

configure({ adapter: new Adapter() });
vi.mock('axios');
describe('FindPw', () => {
  const setStateOpenEmailMock = vi.fn();
  const useStateMock: any = (useState: boolean) => [useState, setStateOpenEmailMock];
  vi.spyOn(React, 'useState').mockImplementation(useStateMock);
  const setStateOpenAuthNumberMock = vi.fn();
  const useStateForAuthNumberMock: any = (useState: boolean) => [
    useState,
    setStateOpenAuthNumberMock,
  ];
  vi.spyOn(React, 'useState').mockImplementation(useStateForAuthNumberMock);
  const props: FindPwChildProps = {
    openEmailForm: true,
    setOpenEmailForm: setStateOpenEmailMock,
    openAuthNumberForm: false,
    setOpenAuthNumberForm: setStateOpenAuthNumberMock,
  };
  const navigate = vi.fn();
  beforeEach(() => {
    vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
  });

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
  it('btn-prev 클릭 시, 이메일 작성 폼이 열려있다면 이전 페이지로 이동', () => {
    render(
      <BrowserRouter>
        <FindPwTopBar {...props} />
      </BrowserRouter>,
    );
    const btnPrev = screen.getByRole('button', { name: 'btn-prev' });
    fireEvent.click(btnPrev);
    expect(navigate).toHaveBeenCalledWith(-1);
  });
  it('btn-prev 클릭 시, 인증 번호 폼이 열려있다면 이메일 폼으로 돌아가기 ', () => {
    const newProps: FindPwChildProps = { ...props, openAuthNumberForm: true };
    render(
      <BrowserRouter>
        <FindPwTopBar {...newProps} />
        <FindPwContents {...newProps} />
      </BrowserRouter>,
    );
    const btnPrev = screen.getByRole('button', { name: 'btn-prev' });
    fireEvent.click(btnPrev);
    expect(props.setOpenAuthNumberForm).toBeCalledWith(false);
  });
  it('btn-prev 클릭 시, 비밀번호 재설정 폼이 열려 있다면 인증번호 폼으로 돌아가기 ', () => {
    const newProps: FindPwChildProps = {
      ...props,
      openEmailForm: false,
      openAuthNumberForm: false,
    };
    render(
      <BrowserRouter>
        <FindPwTopBar {...newProps} />
        <FindPwContents {...newProps} />
      </BrowserRouter>,
    );
    const btnPrev = screen.getByRole('button', { name: 'btn-prev' });
    fireEvent.click(btnPrev);
    expect(props.setOpenEmailForm).toBeCalledWith(true);
    expect(props.setOpenAuthNumberForm).toBeCalledWith(true);
  });
  //FindPwContents
  const findPwConfirm = shallow(<FindPwContents {...props} />);
  it('openEmailForm가 true일때 이메일 작성 폼이 열리지만 비밀번호 작성 폼은 열리지 않음', () => {
    findPwConfirm.setProps({ openEmailForm: true });
    findPwConfirm.setProps({ openAuthNumberForm: false });
    findPwConfirm.update();
    expect(findPwConfirm.find(EmailVerification).exists()).toBeTruthy();
    expect(findPwConfirm.find(PasswordForm).exists()).not.toBeTruthy();
  });
  it('openEmailForm가 false일때 비밀번호 작성 폼은 열리지만 이메일 작성 폼은 열리지 않음', () => {
    findPwConfirm.setProps({ openEmailForm: false });
    findPwConfirm.update();
    expect(findPwConfirm.find(EmailVerification).exists()).not.toBeTruthy();
    expect(findPwConfirm.find(PasswordForm).exists()).toBeTruthy();
  });
  it('비밀번호, 비밀번호 입력을 올바르게 적었을 경우, 비밀번호 변경 버튼 활성화', async () => {
    const pw = 'newpassword12!';
    const passwordInput = findPwConfirm.find(PasswordForm).dive().find(`#${INPUT_FORM_ID.pw}`);
    passwordInput.simulate('change', { target: { value: pw } });
    const confirmPasswordInput = findPwConfirm
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
