import React, { useEffect } from "react";
import ModalPortal from "./ModalPortal";
import { confirmModalType } from "./modalTypes";

type ConfirmModalProps ={
  modalState: confirmModalType,
  closeModal:()=>void
};
const ConfirmModal=({modalState, closeModal}:ConfirmModalProps)=>{
  useEffect(()=>{
    const modalEle = document.querySelector(".modal");
    modalEle?.classList.add("confirm-modal");
  },[]);
  return ( 
    <ModalPortal>
      {modalState.title !== null &&
        <div className="title">
          {modalState.title}
        </div>
      }
      <div className="contents">
        {modalState.contents}
      </div>
      <div className="btns">
        <button 
          type ="button"
          className="btn-yes"
          onClick={closeModal}
        >
          {modalState.yesBtn?.text}
        </button>
        <button 
          type ="button"
          className="btn-no"
          onClick={closeModal}
        >
          {modalState.noBtn?.text}
        </button>
      </div>
    </ModalPortal>
  )
};
export default React.memo(ConfirmModal)