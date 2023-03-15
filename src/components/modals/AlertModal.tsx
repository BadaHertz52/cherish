import React, { useEffect } from "react";
import Modal from "./Modal";
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
    <Modal>
      <button
        type="button"
        onClick={closeModal}
      >
        close
      </button>
      <div className="content">
        {item.contents}
      </div>
    </Modal>
  )
};
export default React.memo(AlertModal)