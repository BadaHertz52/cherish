import React, { useEffect } from "react";
import ModalPortal from "./ModalPortal";
import { toastModalType } from "./modalTypes";

type ToastModalProps ={
  modalState: toastModalType,
  closeModal :()=>void
};
const ToastModal=({modalState ,closeModal}:ToastModalProps)=>{
  useEffect(()=>{
    const modalEle = document.querySelector(".modal") as HTMLElement|null;
    modalEle?.classList.add("toast-modal");
    if(modalEle !==null){
      modalEle.style.top = modalState.top;
      modalEle.style.left = modalState.left;
    };
    setTimeout(() => {
      closeModal();
    }, 2000);
  },[]);
  return ( 
    <ModalPortal>
      <div className="contents">
        {modalState.contents}
      </div>
    </ModalPortal>
  )
};
export default React.memo(ToastModal)