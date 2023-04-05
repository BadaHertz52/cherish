import React, { ReactNode, useEffect } from 'react';
import ModalPortal from '../ModalPortal';
import { ConfirmModalBtnType } from '../modalTypes';
import './style.scss';
export type ConfirmModalProps = {
  title: string;
  children: ReactNode;
  yesBtn: ConfirmModalBtnType;
  noBtn: ConfirmModalBtnType;
  closeModal: () => void;
};
const ConfirmModal = ({ title, children, yesBtn, noBtn, closeModal }: ConfirmModalProps) => {
  const onClickYesBtn = () => {
    if (yesBtn.otherFn !== null) {
      yesBtn.otherFn();
    }
    closeModal();
  };
  const onClickNoBtn = () => {
    if (noBtn.otherFn !== null) {
      noBtn.otherFn();
    }
    closeModal();
  };
  useEffect(() => {
    const modalEl = document.querySelector('.modal');
    modalEl?.classList.add('confirm-modal');
  }, []);
  return (
    <ModalPortal>
      {title !== null && <h2 className="title">{title}</h2>}
      <section className="contents">{children}</section>
      <section className="btn-group">
        <button type="button" className="btn-yes" onClick={onClickYesBtn}>
          {yesBtn?.text}
        </button>
        <button type="button" className="btn-no" onClick={onClickNoBtn}>
          {noBtn?.text}
        </button>
      </section>
    </ModalPortal>
  );
};
export default React.memo(ConfirmModal);
