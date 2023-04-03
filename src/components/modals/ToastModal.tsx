import React, { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { ToastModalType } from './modalTypes';

type ToastModalProps = {
  modalState: ToastModalType;
  closeModal: () => void;
};
const ToastModal = ({ modalState, closeModal }: ToastModalProps) => {
  useEffect(() => {
    const modalEl = document.querySelector('.modal') as HTMLElement | null;
    modalEl?.classList.add('toast-modal');
    if (modalEl !== null) {
      modalEl.style.top = modalState.top;
      modalEl.style.left = modalState.left;
    }
    setTimeout(() => {
      closeModal();
    }, 2000);
  }, []);
  return (
    <ModalPortal>
      <div className="contents">{modalState.contents}</div>
    </ModalPortal>
  );
};
export default React.memo(ToastModal);