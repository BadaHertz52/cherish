import React, { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { AlertModalType } from './modalTypes';

type AlertModalProps = {
  modalState: AlertModalType;
  short: boolean;
  closeModal: () => void;
};
const AlertModal = ({ modalState, short, closeModal }: AlertModalProps) => {
  useEffect(() => {
    const modalEl = document.querySelector('.modal');
    modalEl?.classList.add('alert-modal');
  }, []);
  return (
    <ModalPortal>
      <section className={`contents ${short ? 'short' : 'long'}`}>{modalState}</section>
      <button type="button" className="btn-close" title="close btn" onClick={closeModal}>
        닫기
      </button>
    </ModalPortal>
  );
};
export default React.memo(AlertModal);
