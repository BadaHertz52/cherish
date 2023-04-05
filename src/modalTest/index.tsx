import React, { useState, useEffect } from 'react';
import AlertModal from '../modals/alertModal';
import ConfirmModal from '../modals/confirmModal';
import BottomNavModal from '../modals/bottomNavModal';
import {
  ConfirmModalBtnType,
  ConfirmModalType,
  FilteringConditionType,
  FullScreModalType,
  ToastModalType,
} from '../modals/modalTypes';
import ToastModal from '../modals/toastModal';
import FullScreModal from '../modals/fullModal';
import product_sampleImg from './product_sample.jpg';
import './style.scss';

/**
 * 모달 창 기능을 보기 위한 코드로 , 실제 사용에는 필요 없습니다. 추후 삭제 예정
 * @returns
 */
const ModalTest = () => {
  const modalType = {
    alert: 'alert',
    bottom: 'bottom',
    confirm: 'confirm',
    full: 'full',
    toast: 'toast',
  } as const;
  type OpenTargetType = keyof typeof modalType;
  const [openTarget, setOpenTarget] = useState<OpenTargetType | null>('alert');
  const [openBottomNavModal, setOpenBottomNavModal] = useState<boolean>(
    openTarget === modalType.bottom,
  );
  const AlertTextContainer = () => {
    return (
      <div className="alert-modal__text-container">
        <h4> 23년 2월 24일 본인인증 서비스 작업 안내</h4>
        <p className="day">2024.02.20</p>
        <p>안녕하세요.</p>
        <div className="text">
          본 이용약관은 크로키닷컴 주식회사(이하 "회사"라 합니다)가 운영하는 “지그재그(ZIGZAG)”
          서비스 (이하 "지그재그"라 합니다)와 그 외 다양한 인터넷 웹사이트 및
          응용프로그램(어플리케이션, 앱)인 “지그재그 외 플랫폼” 서비스를 통해서 제공되는 전자상거래
          관련 서비스 및 기타 서비스(이하 “서비스”라 합니다)를 이용하는 자(이하 “이용자”라 합니다)
          사이의 권리, 의무, 기타 필요한 사항을 정함으로써 상호 이익을 도모하는 것을 그 목적으로
          합니다.
        </div>
      </div>
    );
  };
  const [alertModalChildren, setAlertModalChildren] = useState<string>('alert01');
  const confirmYesBtn: ConfirmModalBtnType = {
    text: 'yes',
    path: null,
    otherFn: null,
  };
  const confirmNoBtn: ConfirmModalBtnType = {
    text: 'no',
    path: null,
    otherFn: null,
  };

  //사용자가 선택한 필터링 조건
  const selectedFilteringCondition: FilteringConditionType = {
    productType: ['food'],
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
    },
    introduction:
      'test test test test test test test test test test test test test test test test test test test test ',
    tag: ['tag1', 'tag2', 'tag3'],
  };
  const [toastModalState, setToastModalState] = useState<ToastModalType>();
  const sendData = (filteringCondition: FilteringConditionType) => {
    // 실제로 사용시에는 서버에 새로운 필터링 조건을 보고 서버로 부터 받은 새로운 검색 결과를 화면에 띄우는 작업을 진행하면 됨
    console.log('filteringCondition', filteringCondition);
  };
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
        <button
          type="button"
          onClick={() => {
            setOpenTarget('alert');
            setAlertModalChildren('alert01');
          }}
        >
          open alert modal
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenTarget('alert');
            setAlertModalChildren('alert02');
          }}
        >
          open alert modal_2
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
      {openTarget === modalType.alert &&
        (alertModalChildren === 'alert01' ? (
          <AlertModal center={true} short={true} closeModal={() => setOpenTarget(null)}>
            alert
          </AlertModal>
        ) : (
          <AlertModal center={false} short={false} closeModal={() => setOpenTarget(null)}>
            <AlertTextContainer />
          </AlertModal>
        ))}
      {openTarget == modalType.confirm && (
        <ConfirmModal
          title="title"
          yesBtn={confirmYesBtn}
          noBtn={confirmNoBtn}
          closeModal={() => setOpenTarget(null)}
        >
          "confirmModal"
        </ConfirmModal>
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
        sendData={sendData}
        closeModal={() => setOpenTarget(null)}
      />
    </div>
  );
};

export default React.memo(ModalTest);
