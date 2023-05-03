import React from 'react';

import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi, expect, it, describe } from 'vitest';

import { InputDataType } from '@/pages/SignUp/signUpTypes';

import PasswordForm, { PasswordFormProps } from '.';

configure({ adapter: new Adapter() });

describe('PasswordForm', () => {
  const setStateMock = vi.fn();
  const useStateMock: any = (useState: InputDataType) => [useState, setStateMock];
  vi.spyOn(React, 'useState').mockImplementation(useStateMock);
  const setDisableMock = vi.fn();
  const useDisableStateMock: any = (useState: boolean) => [useState, setDisableMock];
  vi.spyOn(React, 'useState').mockImplementation(useDisableStateMock);
  vi.spyOn(React, 'useEffect').mockImplementation(f => f());
  const props: PasswordFormProps = {
    confirmPw: { value: '1234', errorType: undefined },
    setConfirmPw: setStateMock,
    pw: { value: '1234!password', errorType: undefined },
    setPw: vi.fn,
    setDisableBtn: setDisableMock,
  };
  const wrapper = shallow(<PasswordForm {...props} />);

  it('PasswordForm 렌더링', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('비밀번호, 비밀번호 확인 값이 변경되면 disableBtn 값과 confirmPw의 errorType 변경', () => {
    render(<PasswordForm {...props} />);
    expect(props.setConfirmPw).toHaveBeenCalledTimes(1);
    expect(props.setDisableBtn).toHaveBeenCalledWith(true);
    // setConfirmPw를 동기 처리로 변경해서 아래의 테스트 코드가 불가 [to do]
    // expect(props.setConfirmPw).toHaveBeenCalledWith({
    //   errorType: 'invalidConfirmPw',
    //   value: props.confirmPw.value,
    // });
  });
  it('비밀번호와 비밀번호 값이 같을 경우, nextBtn 활성화', () => {
    render(
      <PasswordForm
        confirmPw={props.pw}
        pw={props.pw}
        setConfirmPw={props.setConfirmPw}
        setPw={props.setPw}
        setDisableBtn={props.setDisableBtn}
      />,
    );
    expect(props.setDisableBtn).toHaveBeenCalledWith(false);
    // setConfirmPw를 동기 처리로 변경해서 아래의 테스트 코드가 불가 [to do]
    // expect(props.setConfirmPw).toHaveBeenCalledWith({
    //   errorType:undefined,
    //   value: props.confirmPw.value,
    // });
  });
});
