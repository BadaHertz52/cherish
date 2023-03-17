import React, { useEffect } from "react";
import ModalPortal from "./ModalPortal";
import { modalCommonType } from "./modalTypes";
import {AiOutlineClose} from 'react-icons/ai';

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
      <AiOutlineClose
        className="btn-close"
        onClick={closeModal}
      />
      <div className="contents">
        {modalState.contents}
      </div>
    </ModalPortal>
  )
};
export default React.memo(AlertModal)