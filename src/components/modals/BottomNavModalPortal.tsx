import React, {ReactNode } from 'react';
import * as reactDOM from 'react-dom';

type BottomNavModalPortalProps ={
  children:ReactNode
}
const BottomNavModalPortal=({children}:BottomNavModalPortalProps)=>{
  const modalEl = document.getElementById("bottom-nav-modal-root") as HTMLElement;
  return reactDOM.createPortal(
    <div className='modal bottom-nav-modal'>
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
export default  React.memo(BottomNavModalPortal);