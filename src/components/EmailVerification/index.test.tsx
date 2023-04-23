import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi } from 'vitest';

import { AuthNumberForm, EmailVerification } from '@/components';
import { InputDataType } from '@/pages/SignUp/signUpTypes';

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
  const authNumberFormProps = {
    email: { value: 'test@email.coim' },
    authNumber: { value: '' },
    setAuthNumber: vi.fn(),
    openTimer: true,
    setOpenTimer: vi.fn(),
    overTime: false,
    setOverTime: vi.fn(),
    setOpenToastModal: vi.fn(),
    setDisableBtn: vi.fn(),
    verifiedEmail: { current: undefined },
    isInFindPw: false,
  };
  it('should render without throwing an error and show btn-email  and  hide authNumberForm  when openAuthNumberForm is false', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.btn-email').exists()).toBe(true);

    expect(wrapper.find(AuthNumberForm).exists()).toBe(false);
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
    const authNumberWrapper = shallow(
      <AuthNumberForm
        email={email}
        authNumber={authNumberFormProps.authNumber}
        setAuthNumber={authNumberFormProps.setAuthNumber}
        openTimer={authNumberFormProps.openTimer}
        setOpenTimer={authNumberFormProps.setOpenTimer}
        overTime={authNumberFormProps.overTime}
        setOverTime={authNumberFormProps.setOverTime}
        setOpenToastModal={authNumberFormProps.setOpenTimer}
        setDisableBtn={authNumberFormProps.setDisableBtn}
        verifiedEmail={authNumberFormProps.verifiedEmail}
        isInFindPw={authNumberFormProps.isInFindPw}
      />,
    );
    expect(authNumberWrapper.exists()).toBe(true);
    expect(
      openAuthNumberWrapper.find(AuthNumberForm).dive().find('.authNumber-form').exists(),
    ).toBe(true);
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
  // 이메일 인증 버튼 클릭 시 result 값에 따란 테스트
});
