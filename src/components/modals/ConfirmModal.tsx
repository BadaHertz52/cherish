import React, { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { ConfirmModalType } from './modalTypes';

type ConfirmModalProps = {
  modalState: ConfirmModalType;
  closeModal: () => void;
};
const ConfirmModal = ({ modalState, closeModal }: ConfirmModalProps) => {
  useEffect(() => {
    const modalEl = document.querySelector('.modal');
    modalEl?.classList.add('confirm-modal');
  }, []);
  return (
    <ModalPortal>
      {modalState.title !== null && <title>{modalState.title}</title>}
      <section className="contents">{modalState.contents}</section>
      <section className="btn-group">
        <button type="button" className="btn-yes" onClick={closeModal}>
          {modalState.yesBtn?.text}
        </button>
        <button type="button" className="btn-no" onClick={closeModal}>
          {modalState.noBtn?.text}
        </button>
      </section>
    </ModalPortal>
  );
};
export default React.memo(ConfirmModal);
