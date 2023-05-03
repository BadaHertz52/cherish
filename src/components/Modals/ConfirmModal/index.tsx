import React, { ReactNode, useEffect } from 'react';

import { ConfirmModalBtnType } from '@/components/Modals/modalTypes';

import { handleAppScroll } from '../functions';
import ModalPortal from '../ModalPortal';
import './style.scss';
export type ConfirmModalProps = {
  title?: string;
  children: ReactNode;
  yesBtn?: ConfirmModalBtnType;
  noBtn?: ConfirmModalBtnType;
  closeModal: () => void;
};
const ConfirmModal = ({ title, children, yesBtn, noBtn, closeModal }: ConfirmModalProps) => {
  const onClickYesBtn = () => {
    if (yesBtn?.otherFn) {
      yesBtn?.otherFn();
    }
    if (yesBtn?.path) {
      window.location.href = yesBtn.path;
    }
    closeModal();
  };
  const onClickNoBtn = () => {
    if (noBtn?.otherFn) {
      noBtn.otherFn();
    }
    if (noBtn?.path) {
      window.location.href = noBtn.path;
    }
    closeModal();
  };
  useEffect(() => {
    const modalEl = document.querySelector('.modal');
    modalEl?.classList.add('confirm-modal');
    handleAppScroll(true);
    return () => {
      handleAppScroll(false);
    };
  }, []);
  return (
    <ModalPortal>
      {title && <h2 className="confirm-modal__title">{title}</h2>}
      <section className="confirm-modal__contents">{children}</section>
      <section className="confirm-modal__btn-group">
        <button type="button" className="btn-yes" onClick={onClickYesBtn}>
          {yesBtn?.text || '확인'}
        </button>
        <button type="button" className="btn-no" onClick={onClickNoBtn}>
          {noBtn?.text || '취소'}
        </button>
      </section>
    </ModalPortal>
  );
};
export default React.memo(ConfirmModal);
