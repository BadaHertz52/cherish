import React, { ReactNode } from 'react';
import * as reactDOM from 'react-dom';

type BottomNavModalPortalProps = {
  children: ReactNode;
};
const BottomNavModalPortal = ({ children }: BottomNavModalPortalProps) => {
  const modalEl = document.getElementById('bottom-nav-modal-root') as HTMLElement;
  return reactDOM.createPortal(
    <div className="modal bottom-nav-modal">
      <div className="modal__background">
        <div className="modal__box">
          <div className="modal__inner">{children}</div>
        </div>
      </div>
    </div>,
    modalEl,
  );
};
export default React.memo(BottomNavModalPortal);
