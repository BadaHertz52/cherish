import React, {ReactNode } from 'react';
import * as reactDOM from 'react-dom';

type ModalProps ={
  children:ReactNode
}
const ModalPortal=({children}:ModalProps)=>{
  const modalEl = document.getElementById("modal-root") as HTMLElement;
  return reactDOM.createPortal(
    <div className='modal'>
      <div className="modal-background">
        <div className="modal-box">
          <div className="modal-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
    ,modalEl);
};
export default  React.memo(ModalPortal);