import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi } from 'vitest';

import { checkRegex } from '@/functions/regex';
import { XSSCheck } from '@/functions/xssCheck';
import { ERROR_MSG, InputFormIdType, TestResultType } from '@/pages/SignUp/signUpTypes';

import InputForm, { INPUT_FORM_LABEL, INPUT_FORM_PLACE_HOLDER, InputFormProps } from '.';

configure({ adapter: new Adapter() });

describe('InputForm', () => {
  const props: InputFormProps = {
    id: 'email',
    data: { value: '' },
    setData: vi.fn(),
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
    wrapper.setProps({ data: { value: XSSCheck(value, undefined) } });
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
  it('email 에 대한 유효성 검사와 검사 결과 보여줌', () => {
    wrapper.setProps({ id: 'email' });
    const wrongValue = ['email', 'email@', 'email@aa', 'email@test.comm', '_email@test.com'];
    const testArray = [...wrongValue, 'email@test.co', 'email@test.com', 'email_test@test.com'];
    for (const i of testArray) {
      const expectedError = wrongValue.includes(i) ? ERROR_MSG.invalidEmail : undefined;
      testRegex('email', i, expectedError);
    }
  });
  // name
  //nickname
  //pw
});
