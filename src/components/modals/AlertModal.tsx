import React, { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { AlertModalType, ModalCommonType } from './modalTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type AlertModalProps = {
  modalState: AlertModalType;
  closeModal: () => void;
};
const AlertModal = ({ modalState, closeModal }: AlertModalProps) => {
  useEffect(() => {
    const modalEl = document.querySelector('.modal');
    modalEl?.classList.add('alert-modal');
  }, []);
  return (
    <ModalPortal>
      <button type="button" className="btn-close" title="close btn" onClick={closeModal}>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <section className="contents">{modalState}</section>
    </ModalPortal>
  );
};
export default React.memo(AlertModal);
