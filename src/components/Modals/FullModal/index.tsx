import React, { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';

import { faAngleRight, faBookmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FullScreModalType } from '@/components/Modals/modalTypes';

import ModalPortal from '../ModalPortal';
import './style.scss';
type FullScreModalProps = {
  modalState: FullScreModalType;
  closeModal: () => void;
};
const FullScreModal = ({ modalState, closeModal }: FullScreModalProps) => {
  const ONLINE_SHOP = {
    brand: 'Brand',
    kakao: 'Kakao',
    coupang: 'Coupang',
    naver: 'Naver',
  };
  // 상품 저장 여부
  const [saved, setSaved] = useState<boolean>(modalState.saved);
  /**
   * Add or remove a product from the saved list
   */
  const onClickSaveBtn = () => {
    if (saved) {
      //  상품 저장 취소
    } else {
      //상품 저장
    }
    setSaved(!saved);
  };
  /**
   * Add the class 'hover' to an element when the mouse or touch moves over it
   * @param event TouchEvent | MouseEvent
   */
  const handleMove = (event: TouchEvent<HTMLAnchorElement> | MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLElement | null;
    target?.classList.toggle('hover');
  };

  useEffect(() => {
    const modalEl = document.querySelector('.modal') as HTMLElement | null;
    modalEl?.classList.add('full-scre-modal');
  }, []);
  return (
    <ModalPortal>
      <div className="full-scre-modal-topbar">
        <button className="btn-prev" onClick={closeModal} title="btn-prev" type="button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="title">상품 상세 페이지</div>
      </div>
      <div className="full-scre__container">
        <img src={modalState.img} alt="product image" className="product-img" />
        <div className="not-img">
          <button
            type="button"
            title="save btn"
            className={`btn-save ${saved ? 'on' : ''}`}
            onClick={onClickSaveBtn}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </button>
          <section className="product-inform">
            <h2 className="product-name">{modalState.name}</h2>
            <div className="product-introduction">
              <span>{modalState.introduction}</span>
            </div>
            <div className="product-price">
              <span>{modalState.price}</span>
            </div>
            <div className="tag-group">
              {modalState.tag.map((v, i) => (
                <div className="tag" key={`tag_${i}`}>
                  <span key={`${modalState.name}_tag${i}`}>#{v}</span>
                </div>
              ))}
            </div>
          </section>
          <div className="division">
            <div className="bar"></div>
          </div>
          <section className="store">
            <div className="online-store">
              <h2>온라인 구매처</h2>
              {modalState.store.online.sort().map((v, i) => (
                <div className="site" key={`site_${i}`}>
                  <div className="site__name">{ONLINE_SHOP[v.name]}</div>
                  <a
                    className="site__link"
                    href={v.url}
                    target="_blank"
                    title="상품 보러 가기"
                    onMouseMove={event => handleMove(event)}
                    onTouchMove={event => handleMove(event)}
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ModalPortal>
  );
};
export default React.memo(FullScreModal);
