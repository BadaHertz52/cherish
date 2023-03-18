import React, { MouseEvent, TouchEvent, useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";
import { fullScreModalType} from "./modalTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart ,faChevronLeft  } from "@fortawesome/free-solid-svg-icons";
type FullScreModalProps ={
  modalState: fullScreModalType,
  closeModal :()=>void
};
const FullScreModal=({modalState ,closeModal}:FullScreModalProps)=>{
  const [saved,setSaved]= useState<boolean>(modalState.saved);
  const onClickSaveBtn =()=>{
    if(saved){
      //  상품 저장 취소

    }else{
      //상품 저장
    }
    setSaved(!saved);
  };
  const onMoveLink =(event:TouchEvent<HTMLAnchorElement>| MouseEvent<HTMLAnchorElement>)=>{
    const target =event.target as HTMLElement|null;
    target?.classList.toggle("hover");
  };
  useEffect(()=>{
    const modalEle = document.querySelector(".modal");
    modalEle?.classList.add("full-scre-modal");
  },[]);
  return ( 
    <ModalPortal>
      <div className="topbar">
        <button
          type="button"
          title="previous"
          onClick ={closeModal}
          className ="btn-close"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2>상세 페이지</h2>
      </div>
      <div className="contents">
        <img 
          src={modalState.img} 
          alt="product image" 
          className="product-img"
        />
        <div className="not-img">
          <button
              type="button"
              title="save btn"
              className={`btn-save ${saved? "on" : ""}`}
              onClick ={onClickSaveBtn}
            >
              <FontAwesomeIcon icon={faHeart} />
          </button>
          <section className="inform">
            <ul>
              <li className="product-name">  
                <span>{modalState.name}</span>
              </li>
              <li className="product-price">
                <span>{`${modalState.price}원`}</span>
              </li>
              <li 
                className="one-line-introduction"
              >
                <span>
                  {modalState.oneLineIntroduction}
                </span>
              </li>
              <li className="tag">
                {modalState.tag.map((v,i) => 
                  <span
                    key ={`${modalState.name}_tag${i}`}
                  >
                    #{v}
                  </span>
                    )}
              </li>
            </ul>
          </section>
          <section className="store">
            <div className="online-store">
              <h3>온라인 구매처 정보</h3>
              {modalState.store.online.map((v,i)=>
              <div className="site" key={`site_${i}`} >
                <div className="site-name">
                  {v.name}
                </div>
                <a 
                  className="site-link"
                  href={v.url}
                  target="_blank"
                  onMouseMove={(event)=>onMoveLink(event)}
                  onTouchMove={(event)=>onMoveLink(event)}
                >
                  상품 보러 가기
                </a>
              </div>)}
            </div>
            <div className="offline-store">
              <h3>오프라인 구매처 정보</h3>
              <span>
                {modalState.store.offline}
              </span>
            </div>
          </section>
        </div>
      </div>
    </ModalPortal>
  )
};
export default React.memo(FullScreModal)