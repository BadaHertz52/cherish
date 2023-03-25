import React, { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import ModalPortal from './ModalPortal';
import { FullScreModalType } from './modalTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
type FullScreModalProps = {
  modalState: FullScreModalType;
  closeModal: () => void;
};
const FullScreModal = ({ modalState, closeModal }: FullScreModalProps) => {
  const onlineShop = {
    brand: '브랜드',
    kakao: '카카오',
    coupang: '쿠팡',
    naver: '네이버',
  };
  // 상품 저장 여부
  const [saved, setSaved] = useState<boolean>(modalState.saved);
  const outBoxRef = useRef<HTMLDivElement>(null);
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
    setTimeout(() => {
      if (outBoxRef.current !== null) {
        outBoxRef.current.style.display = 'block';
      }
    }, 100);
    return () => {
      if (outBoxRef.current !== null) {
        outBoxRef.current.style.display = 'none';
      }
    };
  }, []);
  return (
    <ModalPortal>
      <div className="full-scre-modal-outbox" ref={outBoxRef} style={{ display: 'none' }}>
        <div className="topbar">
          <button type="button" title="previous" onClick={closeModal} className="btn-close">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h2>상세 페이지</h2>
        </div>
        <div className="container">
          <img src={modalState.img} alt="product image" className="product-img" />
          <div className="not-img">
            <button
              type="button"
              title="save btn"
              className={`btn-save ${saved ? 'on' : ''}`}
              onClick={onClickSaveBtn}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <section className="product-inform">
              <div className="product-name">
                <span>{modalState.name}</span>
              </div>
              <div className="product-price">
                <span>{`${modalState.price}원`}</span>
              </div>
              <div className="product-introduction">
                <span>{modalState.introduction}</span>
              </div>
              <div className="tag">
                {modalState.tag.map((v, i) => (
                  <span key={`${modalState.name}_tag${i}`}>#{v}</span>
                ))}
              </div>
            </section>
            <section className="store">
              <div className="online-store">
                <h3>온라인 구매처 정보</h3>
                {modalState.store.online.map((v, i) => (
                  <div className="site" key={`site_${i}`}>
                    <div className="site__name">{onlineShop[`${v.name}`]}</div>
                    <a
                      className="site__link"
                      href={v.url}
                      target="_blank"
                      onMouseMove={event => handleMove(event)}
                      onTouchMove={event => handleMove(event)}
                    >
                      상품 보러 가기
                    </a>
                  </div>
                ))}
              </div>
              <div className="offline-store">
                <h3>오프라인 구매처 정보</h3>
                <span>{modalState.store.offline}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
export default React.memo(FullScreModal);
