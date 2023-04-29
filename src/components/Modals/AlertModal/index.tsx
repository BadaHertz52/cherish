import React, { ReactNode, useEffect } from 'react';

import { handleAppScroll } from '../functions';
import ModalPortal from '../ModalPortal';
import './style.scss';
export type AlertModalProps = {
  children: ReactNode;
  center: boolean; //children 이 modal의 가운데 위치 해야하는 지
  short: boolean; //alertModal의 길이가 짧아야하는지, 길어야하는 지
  closeModal: () => void;
};
const AlertModal = ({ children, center, short, closeModal }: AlertModalProps) => {
  useEffect(() => {
    const modalEl = document.querySelector('.modal');
    modalEl?.classList.add('alert-modal');
    handleAppScroll(true);
    return () => {
      handleAppScroll(false);
    };
  }, []);
  return (
    <ModalPortal>
      <section className={`alert-modal__contents ${short ? 'short' : 'long'}`}>
        <div className={`alert-modal__text-container ${center ? 'center' : ''}`}>{children}</div>
      </section>
      <button type="button" className="btn-close" title="close btn" onClick={closeModal}>
        닫기
      </button>
    </ModalPortal>
  );
};
export default React.memo(AlertModal);
