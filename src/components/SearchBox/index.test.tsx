import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { describe, it, expect, vi } from 'vitest';
import SearchBox from '.';

configure({ adapter: new Adapter() });

describe('Testing SearchBox component', () => {
  it('should have an input field and a search icon button', () => {
    const onClick = vi.fn();
    const wrapper = shallow(<SearchBox onClick={onClick} />);
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').prop('disabled')).toBe(true);
    expect(wrapper.find('input').prop('placeholder')).toBe('검색어를 입력해 주세요.');
  });

  it('the button should be disabled if the input field is empty', () => {
    const onClick = vi.fn();
    const wrapper = shallow(<SearchBox onClick={onClick} />);
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('the button should be enabled if the input field is not empty', () => {
    const onClick = vi.fn();
    const wrapper = shallow(<SearchBox onClick={onClick} />);
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  it('the button should have a click handler that logs the value of the input field to the console', () => {
    const onClick = vi.fn();
    const wrapper = shallow(<SearchBox onClick={onClick} />);
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });
    wrapper.find('button').simulate('click');
    expect(onClick).toBeCalledWith('hello');
  });
});
