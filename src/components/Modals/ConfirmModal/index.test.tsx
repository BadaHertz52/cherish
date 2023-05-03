import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi, expect, it, describe } from 'vitest';

import { ConfirmModalBtnType } from '../modalTypes';

import ConfirmModal, { ConfirmModalProps } from '.';

configure({ adapter: new Adapter() });

describe('ConfirmModal', () => {
  const otherFn = vi.fn();
  const btn: ConfirmModalBtnType = { text: undefined, path: '/', otherFn: otherFn };
  const props: ConfirmModalProps = {
    title: 'title',
    children: 'children',
    yesBtn: btn,
    noBtn: btn,
    closeModal: vi.fn(),
  };
  const wrapper = shallow(<ConfirmModal {...props} />);
  it('ConfirmModal 렌더링', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('title의 값에 따라 title의 존재가 결정됨', () => {
    expect(wrapper.find('.confirm-modal__title').exists()).toBeTruthy();
    wrapper.setProps({ title: undefined });
    wrapper.update();
    expect(wrapper.find('.confirm-modal__title').exists()).toBeFalsy();
  });
  it(' button 의 기본 문구 확인 ( yest button의 기본 문구 - 확인, no button의 기본 문구-취소 )', () => {
    expect(wrapper.find('.btn-yes').text()).toBe('확인');
    expect(wrapper.find('.btn-no').text()).toBe('취소');
  });
  it('yestBtn, noBtn의 값대로 button이 생성되고 돌작하는 지 여부', () => {
    const newYesBtn = { ...btn, path: '/yes', text: 'yes' };
    const newNoBtn = { ...btn, path: '/no', text: 'no' };
    wrapper.setProps({ yesBtn: newYesBtn });
    wrapper.setProps({ noBtn: newNoBtn });
    wrapper.update();
    const yesBtn = wrapper.find('.btn-yes');
    const noBtn = wrapper.find('.btn-no');
    expect(yesBtn.text()).toBe(newYesBtn.text);
    expect(noBtn.text()).toBe(newNoBtn.text);
    Object.defineProperty(window, 'location', {
      value: {
        href: newYesBtn.path,
      },
      writable: true,
    });
    //yesBtn
    yesBtn.simulate('click');
    expect(window.location.href).toEqual(newYesBtn.path);
    expect(otherFn).toBeCalled();
    //noBtn
    noBtn.simulate('click');
    expect(window.location.href).toEqual(newNoBtn.path);
    expect(otherFn).toBeCalled();
  });
});
