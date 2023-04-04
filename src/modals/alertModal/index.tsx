import React, { ReactNode, useEffect } from 'react';
import ModalPortal from '../ModalPortal';
import './style.scss';
type AlertModalProps = {
  children: ReactNode;
  center: boolean;
  short: boolean;
  closeModal: () => void;
};
const AlertModal = ({ children, center, short, closeModal }: AlertModalProps) => {
  useEffect(() => {
    const modalEl = document.querySelector('.modal');
    modalEl?.classList.add('alert-modal');
  }, []);
  return (
    <ModalPortal>
      <section className={`contents ${short ? 'short' : 'long'}`}>
        <div className={`alert-modal__text-container ${center ? 'center' : ''}`}>{children}</div>
      </section>
      <button type="button" className="btn-close" title="close btn" onClick={closeModal}>
        닫기
      </button>
    </ModalPortal>
  );
};
export default React.memo(AlertModal);
