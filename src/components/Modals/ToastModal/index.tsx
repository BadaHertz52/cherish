import React, { useEffect } from 'react';

import { ToastModalType } from '@/components/Modals/modalTypes';

import ModalPortal from '../ModalPortal';
import './style.scss';
type ToastModalProps = {
  modalState: ToastModalType;
  closeModal: () => void;
};
const ToastModal = ({ modalState, closeModal }: ToastModalProps) => {
  useEffect(() => {
    const modalEl = document.querySelector('.modal') as HTMLElement | null;
    modalEl?.classList.add('toast-modal');
    if (modalEl) {
      modalEl.style.top = modalState.top;
      modalEl.style.left = modalState.left;
    }
    setTimeout(() => {
      closeModal();
    }, 2000);
  }, []);
  return (
    <ModalPortal>
      <div className="toast-modal__contents">{modalState.contents}</div>
    </ModalPortal>
  );
};
export default React.memo(ToastModal);
