import React, { useState, useEffect } from 'react';

import AlertModal from '@/components/Modals/AlertModal';
import BottomNavModal from '@/components/Modals/BottomNavModal';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import FullScreModal from '@/components/Modals/FullModal';
import { getToastModalPosition } from '@/components/Modals/functions';
import {
  CONDITION_NAME,
  FilteringConditionType,
  FullScreModalType,
  ToastModalType,
} from '@/components/Modals/modalTypes';
import ToastModal from '@/components/Modals/ToastModal';

import product_sampleImg from './product_sample.jpg';
import './style.scss';

/**
 * 모달 창 기능을 보기 위한 코드로 , 실제 사용에는 필요 없습니다. 추후 삭제 예정
 * @returns
 */
const ModalTest = () => {
  const MODAL_TYPE = {
    alert: 'alert',
    bottom: 'bottom',
    confirm: 'confirm',
    full: 'full',
    toast: 'toast',
  } as const;
  type OpenTargetType = keyof typeof MODAL_TYPE;
  const [openTarget, setOpenTarget] = useState<OpenTargetType | null>('alert');
  const [openBottomNavModal, setOpenBottomNavModal] = useState<boolean>(
    openTarget === MODAL_TYPE.bottom,
  );
  const AlertTextContainer = () => {
    return (
      <div className="alert-modal__text-container">
        <h4> 23년 2월 24일 본인인증 서비스 작업 안내</h4>
        <p className="day">2024.02.20</p>
        <p>안녕하세요.</p>
        <div>
          본 이용약관은 크로키닷컴 주식회사(이하 &quot;회사 &quot;라 합니다)가 운영하는
          &quot;지그재그(ZIGZAG) &quot; 서비스 (이하 &quot;지그재그 &quot;라 합니다)와 그 외 다양한
          인터넷 웹사이트 및 응용프로그램(어플리케이션, 앱)인 &quot;지그재그 외 플랫폼 &quot;
          서비스를 통해서 제공되는 전자상거래 관련 서비스 및 기타 서비스(이하 &quot;서비스 &quot;라
          합니다)를 이용하는 자(이하 &quot;이용자 &quot;라 합니다) 사이의 권리, 의무, 기타 필요한
          사항을 정함으로써 상호 이익을 도모하는 것을 그 목적으로 합니다.
        </div>
      </div>
    );
  };
  const [alertModalChildren, setAlertModalChildren] = useState<string>('alert01');
  //사용자가 선택한 필터링 조건
  const selectedFilteringCondition: FilteringConditionType = {
    productType: [CONDITION_NAME.food],
    gender: null,
    job: null,
    situation: [CONDITION_NAME.admissionAndGraduation],
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
    if (openTarget === MODAL_TYPE.bottom) {
      setOpenBottomNavModal(true);
    } else {
      setOpenBottomNavModal(false);
    }
    // toast modal
    if (openTarget === MODAL_TYPE.toast) {
      // toast modal이 열려야하는 위치에 해당하는 element의 domRect
      const position = getToastModalPosition();
      if (position) {
        setToastModalState({
          contents: 'toast modal!!!',
          top: `${position.top}.px`,
          left: position.left,
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
            setOpenTarget(MODAL_TYPE.alert);
            setAlertModalChildren('alert01');
          }}
        >
          open alert modal
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenTarget(MODAL_TYPE.alert);
            setAlertModalChildren('alert02');
          }}
        >
          open alert modal_2
        </button>
        <button type="button" onClick={() => setOpenTarget(MODAL_TYPE.confirm)}>
          open confirm modal
        </button>
        <button type="button" onClick={() => setOpenTarget(MODAL_TYPE.bottom)}>
          open bottom nav modal
        </button>
        <button type="button" onClick={() => setOpenTarget(MODAL_TYPE.toast)}>
          open toast modal
        </button>
        <button type="button" onClick={() => setOpenTarget('full')}>
          open full screen modal
        </button>
      </div>
      {openTarget === MODAL_TYPE.alert &&
        (alertModalChildren === 'alert01' ? (
          <AlertModal center={true} short={true} closeModal={() => setOpenTarget(null)}>
            alert
          </AlertModal>
        ) : (
          <AlertModal center={false} short={false} closeModal={() => setOpenTarget(null)}>
            <AlertTextContainer />
          </AlertModal>
        ))}
      {openTarget == MODAL_TYPE.confirm && (
        <ConfirmModal title="title" closeModal={() => setOpenTarget(null)}>
          "confirm modal"
        </ConfirmModal>
      )}
      {openTarget === MODAL_TYPE.toast && toastModalState && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenTarget(null)} />
      )}
      {openTarget === MODAL_TYPE.full && (
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
