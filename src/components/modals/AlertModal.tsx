import React, { useEffect } from "react";
import ModalPortal from "./ModalPortal";
import { modalCommonType } from "./Modals";
type AlertModalProps ={
  item: modalCommonType,
  closeModal :()=>void
};
const AlertModal=({item ,closeModal}:AlertModalProps)=>{
  useEffect(()=>{
    const modalEle = document.querySelector(".modal");
    modalEle?.classList.add("alert-modal");
  },[]);
  return ( 
    <ModalPortal>
      <button
        type="button"
        onClick={closeModal}
      >
        close
      </button>
      <div className="content">
        {item.contents}
      </div>
    </ModalPortal>
  )
};
export default React.memo(AlertModal)