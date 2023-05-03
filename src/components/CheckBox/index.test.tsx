import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { describe, vi, it, expect } from 'vitest';

import CheckBox, { CheckBoxProps } from '.';

configure({ adapter: new Adapter() });

describe('CheckBox', () => {
  const props: CheckBoxProps = {
    id: 'food',
    name: '식품',
    label: '식품',
    isChecked: () => true,
    onChange: vi.fn,
  };
  const wrapper = shallow(<CheckBox {...props} />);
  it('CheckBox 렌더링', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('input의 id, name ,label 설정', () => {
    const inputEl = wrapper.find('input');
    expect(inputEl.prop('id')).toEqual(props.id);
    expect(inputEl.prop('name')).toEqual(props.name);
    expect(wrapper.find('.check-box__label span').text()).toEqual(props.name);
  });
  it('label 설정 확인', () => {
    const labelArr = wrapper.find('label');
    expect(labelArr.at(0).prop('htmlFor')).toBe(props.id);
    expect(labelArr.at(1).prop('htmlFor')).toBe(props.id);
  });
  it('isChecked  값에 따라 checked 값과 check-box__label 클래스 변경', () => {
    expect(wrapper.find('input').prop('checked')).toEqual(props.isChecked());
    expect(wrapper.find('.check-box__label').hasClass('on')).toBeTruthy();
    wrapper.setProps({ isChecked: () => false });
    wrapper.update();
    expect(wrapper.find('.check-box__label').hasClass('on')).toBeFalsy();
  });
});
