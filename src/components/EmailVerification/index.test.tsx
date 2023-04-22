import React from 'react';

import { render } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi } from 'vitest';

import { onEmailVerification } from '@/api/auth/email';
import { EMAIL_API_RESULT_TYPE } from '@/api/auth/types';
import { InputDataType } from '@/pages/SignUp/signUpTypes';

import EmailVerification from '.';

vi.mock('@/api/auth/email');

configure({ adapter: new Adapter() });

describe('EmailVerification', () => {
  const props = {
    setDisableBtn: vi.fn(),
    email: { value: '', errorType: undefined },
    setEmail: vi.fn(),
    openAuthNumberForm: false,
    setOpenAuthNumberForm: vi.fn(),
    toastModalPositionTargetEl: null,
  };
  const { setDisableBtn, email, setEmail, setOpenAuthNumberForm } = props;
  const makeComponent = (additionOfLabel?: string, isInFindPw?: boolean) => (
    <EmailVerification
      additionOfLabel={additionOfLabel}
      setDisableBtn={setDisableBtn}
      email={email}
      setEmail={setEmail}
      openAuthNumberForm={props.openAuthNumberForm}
      setOpenAuthNumberForm={setOpenAuthNumberForm}
      toastModalPositionTargetEl={props.toastModalPositionTargetEl}
      isInFindPw={isInFindPw}
    />
  );
  const getElement = (additionOfLabel?: string, isInFindPw?: boolean) =>
    render(makeComponent(additionOfLabel, isInFindPw));

  const wrapper = shallow(
    <EmailVerification
      setDisableBtn={setDisableBtn}
      email={email}
      setEmail={setEmail}
      openAuthNumberForm={false}
      setOpenAuthNumberForm={setOpenAuthNumberForm}
      toastModalPositionTargetEl={null}
    />,
  );
  it('should render without throwing an error and show btn-email  and  hide authNumberForm  when openAuthNumberForm is false', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.btn-email').exists()).toBe(true);
    expect(wrapper.find('.authNumber-form').exists()).toBe(false);
  });
  it('should hide btn-email and show  authNumberForm is hidden when openAuthNumberForm is true', () => {
    const openAuthNumberWrapper = shallow(
      <EmailVerification
        setDisableBtn={setDisableBtn}
        email={email}
        setEmail={setEmail}
        openAuthNumberForm={true}
        setOpenAuthNumberForm={setOpenAuthNumberForm}
        toastModalPositionTargetEl={null}
      />,
    );
    expect(openAuthNumberWrapper.exists()).toBe(true);
    expect(openAuthNumberWrapper.find('.btn-email').exists()).toBe(false);
    expect(openAuthNumberWrapper.find('.authNumber-form').exists()).toBe(true);
  });
  it('should show or hide message that is "이메일은 회원가입 후 변경하실 수 없어요." according to value of isInFindPw ', () => {
    expect(wrapper.find('.email-form .alert').exists()).toBe(true);

    const hideWrapper = shallow(
      <EmailVerification
        setDisableBtn={setDisableBtn}
        email={email}
        setEmail={setEmail}
        openAuthNumberForm={true}
        setOpenAuthNumberForm={setOpenAuthNumberForm}
        toastModalPositionTargetEl={null}
        isInFindPw={true}
      />,
    );
    expect(hideWrapper.find('.email-form .alert').exists()).toBe(false);
  });
  it('should be disable btn-email when value of email is empty or errorType of email is not undefined', () => {
    const errorEmail: InputDataType = {
      value: '',
      errorType: 'invalidEmail',
    };
    const wrapper = shallow(
      <EmailVerification
        setDisableBtn={setDisableBtn}
        email={errorEmail}
        setEmail={setEmail}
        openAuthNumberForm={false}
        setOpenAuthNumberForm={setOpenAuthNumberForm}
        toastModalPositionTargetEl={null}
      />,
    );
    const btnEmail = wrapper.find('.btn-email');
    expect(btnEmail.props().disabled).toBe(true);
  });
  it('should be  able btn-email when value of email is not empty and errorType of email is undefined', () => {
    const emailData: InputDataType = {
      value: 'test@email.com',
      errorType: undefined,
    };
    const wrapper = shallow(
      <EmailVerification
        setDisableBtn={setDisableBtn}
        email={emailData}
        setEmail={setEmail}
        openAuthNumberForm={false}
        setOpenAuthNumberForm={setOpenAuthNumberForm}
        toastModalPositionTargetEl={null}
      />,
    );
    const btnEmail = wrapper.find('.btn-email');
    expect(btnEmail.props().disabled).toBe(false);
  });

  // it('onClickEmailBtn should works properly when result is EMAIL_API_RESULT_TYPE.duplicate', async () => {
  //   const onEmailVerificationMock = vi.fn().mockResolvedValue(EMAIL_API_RESULT_TYPE.duplicate);
  //   // const { onEmailVerification } = await import('@/api/auth/email');
  //   // onEmailVerification.mockResolvedValueOnce(EMAIL_API_RESULT_TYPE.duplicate);

  //   act(() => {
  //     getElement();
  //   });

  //   await act(async () => {
  //     userEvent.click(screen.getByRole('button', { name: '인증 요청' }));
  //   });

  //   expect(setEmail).toHaveBeenCalledWith(prev => ({
  //     ...prev,
  //     errorType: 'duplicatedEmail',
  //   }));
  // });
});
