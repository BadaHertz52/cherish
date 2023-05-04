import { act, fireEvent, render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { describe, expect, it, vi } from 'vitest';

import EyeSvg from '@/assets/svgs/eye.svg';
import EyeSlashSvg from '@/assets/svgs/eyeslash.svg';

import BtnShowPw from '.';
configure({ adapter: new Adapter() });

describe('BtnShowPw', () => {
  const setHiddenPw = vi.fn();

  it('should render BtnShowPw component of which hiddenPw is true', () => {
    const wrapper = shallow(<BtnShowPw hiddenPw={true} setHiddenPw={setHiddenPw} />);
    expect(wrapper.exists()).toBe(true);
    const btn = wrapper.find('.btn-show-pw');
    expect(btn.exists()).toBe(true);
    expect(wrapper.find(EyeSlashSvg).exists()).toBe(true);
  });
  it('should render BtnShowPw component of which hiddenPw is false', () => {
    const wrapper = shallow(<BtnShowPw hiddenPw={false} setHiddenPw={setHiddenPw} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.btn-show-pw.on').exists()).toBe(true);
    expect(wrapper.find(EyeSvg).exists()).toBe(true);
  });
  it('toggles hiddenPw state when the button is clicked', () => {
    const { getByRole } = render(<BtnShowPw hiddenPw={true} setHiddenPw={setHiddenPw} />);
    const button = getByRole('button');
    expect(button.className).toEqual('btn-show-pw');

    act(() => {
      fireEvent.click(button);
    });
    expect(setHiddenPw).toHaveBeenCalled();
  });
});
