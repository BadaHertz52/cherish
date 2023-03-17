import React, { useEffect } from "react";
import ModalPortal from "./ModalPortal";
import { modalCommonType } from "./modalTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
type AlertModalProps ={
  modalState: modalCommonType,
  closeModal :()=>void
};
const AlertModal=({modalState ,closeModal}:AlertModalProps)=>{
  useEffect(()=>{
    const modalEle = document.querySelector(".modal");
    modalEle?.classList.add("alert-modal");
  },[]);
  return ( 
    <ModalPortal>
      <button
        type="button"
        className="btn-close"
        title="close btn"
        onClick={closeModal}
      >
      <FontAwesomeIcon icon={faXmark}/>
      </button>

      <div className="contents">
        {modalState.contents}
      </div>
    </ModalPortal>
  )
};
export default React.memo(AlertModal)