import { ChangeEvent } from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi, expect, it, describe } from 'vitest';

import RadioBtn, { RadioBtnProps } from '.';

configure({ adapter: new Adapter() });

describe('RadioBtn', () => {
  const props: RadioBtnProps = {
    id: 'profession',
    name: 'job',
    value: 'profession',
    label: '전문직',
    isChecked: true,
    onChange: vi.fn(),
  };
  const wrapper = shallow(<RadioBtn {...props} />);
  const inputEl = wrapper.find('input');
  const labelArr = wrapper.find('label');
  it('RadioBtn 렌더링', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('input 설정 확인', () => {
    expect(inputEl.prop('type')).toEqual('radio');
    expect(inputEl.prop('value')).toEqual(props.value);
    expect(inputEl.prop('name')).toEqual(props.name);
    inputEl.simulate('change', { target: { value: props.value } } as ChangeEvent<HTMLInputElement>);
    expect(props.onChange).toBeCalled();
  });
  it('label 설정 확인', () => {
    expect(labelArr.at(0).prop('htmlFor')).toBe(props.id);
    expect(labelArr.at(1).prop('htmlFor')).toBe(props.id);
  });
  it('input의 checked 값에 따라, label의 스타일 변경', () => {
    expect(labelArr.at(0).prop('className')).toContain('On');
    expect(labelArr.at(1).prop('className')).toContain('On');
    wrapper.setProps({ isChecked: false });
    wrapper.update();
    const newLabelArr = wrapper.find('label');
    expect(newLabelArr.at(0).prop('className')).not.toContain('On');
    expect(newLabelArr.at(1).prop('className')).not.toContain('On');
  });
});
