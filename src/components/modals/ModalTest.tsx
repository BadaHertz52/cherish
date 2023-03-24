import React, { useState, useEffect, useRef } from 'react';
import AlertModal from './AlertModal';
import '../../assets/modal.scss';
import ConfirmModal from './ConfirmModal';
import BottomNavModal from './BottomNavModal';
import {
  ConfirmModalType,
  FilteringConditionType,
  FullScreModalType,
  ModalCommonType,
  ToastModalType,
} from './modalTypes';
import ToastModal from './ToastModal';
import '../../assets/modalTest.scss';
import FullScreModal from './FullScreModal';
import product_sampleImg from '../../assets/product_sample.jpg';

/**
 * 모달 창 기능을 보기 위한 코드로 , 실제 사용에는 필요 없습니다. 추후 삭제 예정
 * @returns
 */
const ModalTest = () => {
  enum modalType {
    alert = 'alert',
    bottom = 'bottom',
    confirm = 'confirm',
    full = 'full',
    toast = 'toast',
  }
  type OpenTargetType = keyof typeof modalType;
  const [openTarget, setOpenTarget] = useState<OpenTargetType | null>('alert');
  const [openBottomNavModal, setOpenBottomNavModal] = useState<boolean>(
    openTarget === modalType.bottom,
  );
  const alertModalState: ModalCommonType = {
    contents: 'alert',
  };
  const confirmModalState: ConfirmModalType = {
    title: 'title',
    contents: 'contents',
    yesBtn: {
      text: 'yes',
      path: null,
      otherFn: null,
    },
    noBtn: {
      text: 'no',
      path: null,
      otherFn: null,
    },
  };
  //사용자가 선택한 필터링 조건
  const selectedFilteringCondition: FilteringConditionType = {
    productType: null,
    gender: null,
    job: null,
    situation: null,
  };
  const fullScreModalState: FullScreModalType = {
    name: 'product name',
    saved: true,
    img: product_sampleImg,
    price: 10000,
    store: {
      online: [
        { name: 'naver', url: '/' },
        { name: 'brand', url: '/' },
        { name: 'coupang', url: '/' },
        { name: 'kakao', url: '/' },
      ],
      offline: '서울특별시 종로구',
    },
    introduction:
      'test test test test test test test test test test test test test test test test test test test test ',
    tag: ['tag1', 'tag2', 'tag3', 'tag4'],
  };
  const [toastModalState, setToastModalState] = useState<ToastModalType>();
  /**
   * 모달 창 기능 테스트를 위한 함수로 , 테스트 이후 실제 사용 단계에서 삭제
   */
  useEffect(() => {
    if (openTarget === 'bottom') {
      setOpenBottomNavModal(true);
    } else {
      setOpenBottomNavModal(false);
    }
    // toast modal
    if (openTarget === 'toast') {
      // toast modal이 열려야하는 위치에 해당하는 element의 domRect
      const targetElDomRect = document
        .getElementById('toast-modal-target')
        ?.getBoundingClientRect();
      if (targetElDomRect !== undefined) {
        setToastModalState({
          contents: 'toast modal!!!',
          top: `${targetElDomRect.top}px`,
          left: `${targetElDomRect.left}px`,
        });
      }
    }
  }, [openTarget]);

  return (
    <div id="modal-test">
      <div className="btn-group">
        <button type="button" onClick={() => setOpenTarget('alert')}>
          open alert modal
        </button>
        <button type="button" onClick={() => setOpenTarget('confirm')}>
          open confirm modal
        </button>
        <button type="button" onClick={() => setOpenTarget('bottom')}>
          open bottom nav modal
        </button>
        <button type="button" onClick={() => setOpenTarget('toast')}>
          open toast modal
        </button>
        <button type="button" onClick={() => setOpenTarget('full')}>
          open full screen modal
        </button>
      </div>
      <div id="toast-modal-target">여기에 toast modal 열기</div>
      {openTarget === modalType.alert && (
        <AlertModal modalState={alertModalState} closeModal={() => setOpenTarget(null)} />
      )}
      {openTarget == modalType.confirm && (
        <ConfirmModal modalState={confirmModalState} closeModal={() => setOpenTarget(null)} />
      )}
      {openTarget === modalType.toast && toastModalState !== undefined && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenTarget(null)} />
      )}
      {openTarget === modalType.full && (
        <FullScreModal modalState={fullScreModalState} closeModal={() => setOpenTarget(null)} />
      )}
      <BottomNavModal
        selectedFilteringCondition={selectedFilteringCondition}
        openBottomNavModal={openBottomNavModal}
        closeModal={() => setOpenTarget(null)}
      />
    </div>
  );
};

export default React.memo(ModalTest);
