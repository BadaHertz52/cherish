import React, { ReactNode, useEffect } from 'react';
<<<<<<< HEAD:src/components/modals/AlertModal.tsx
import ModalPortal from './ModalPortal';

=======
import ModalPortal from '../ModalPortal';
import './style.scss';
>>>>>>> 92f0ab768b31db39f985bd37af7213a37ecd3593:src/modals/alertModal/index.tsx
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
