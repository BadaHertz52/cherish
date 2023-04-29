import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi } from 'vitest';

import ModalPortal from '../ModalPortal';

import AlertModal, { AlertModalProps } from '.';

configure({ adapter: new Adapter() });

describe('Alert modal', () => {
  const props: AlertModalProps = {
    children: <div>alert children</div>,
    center: true,
    short: true,
    closeModal: vi.fn(),
  };
  const wrapper = shallow(<AlertModal {...props} />);
  it('should render AlertModal', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('short props의 값에 따라 className 변경', () => {
    expect(wrapper.find(AlertModal).dive().find('.alert-modal__contents').hasClass('short')).toBe(
      true,
    );
    wrapper.setProps({ short: false });
    wrapper.update();
    expect(wrapper.find('.alert-modal__contents').hasClass('short')).toBe(false);
  });
  it('center props의 값에 따라 className 변경', () => {
    expect(wrapper.find('.alert-modal__text-container').hasClass('center')).toBe(true);
    wrapper.setProps({ center: false });
    wrapper.update();
    expect(wrapper.find('.alert-modal__text-container').hasClass('center')).toBe(false);
  });
});
