import React, { useEffect } from "react";
import Modal from "./Modal";
import { confrimModalType } from "./Modals";

type ConfirmModalProps ={
  item: confrimModalType,
  closeModal:()=>void
};
const ConfirmModal=({item, closeModal}:ConfirmModalProps)=>{
  useEffect(()=>{
    const modalEle = document.querySelector(".modal");
    modalEle?.classList.add("confirm-modal");
  },[]);
  return ( 
    <Modal>
      {item.title !== null &&
        <div className="title">
          {item.title}
        </div>
      }
      <div className="contents">
        {item.contents}
      </div>
      <div className="btns">
        <button 
          type ="button"
          className="btn-yes"
          onClick={closeModal}
        >
          {item.yesBtn?.text}
        </button>
        <button 
          type ="button"
          className="btn-no"
          onClick={closeModal}
        >
          {item.noBtn?.text}
        </button>
      </div>
    </Modal>
  )
};
export default React.memo(ConfirmModal)