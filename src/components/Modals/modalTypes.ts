import { ReactNode } from 'react';

import { GENDER_TYPE, JOB_TYPE } from '@/pages/SignUp/signUpTypes';

/**
 * confirm modal의 yes/no 버튼 type
 */
export type ConfirmModalBtnType = {
  //btn 의 text node
  text?: string;
  //btn 클릭 시 이동해야 할 페이지의 경로
  path?: string;
  //btn 클릭 시 이동/창 닫기 외의 필요한 기능
  otherFn?: () => void;
};
// alert modal - modalCommonType (모달의 공통적인 것들)
export type ModalCommonType = {
  contents: string;
};

/**
 * the unit for top and left is px
 */
export type ToastModalType = {
  contents: string | ReactNode;
  top: string; // unit: px
  left: string;
};
export const CONDITION_NAME = {
  ...JOB_TYPE,
  ...GENDER_TYPE,
  //상품 종류
  food: '식품',
  beauty: '뷰티',
  living: '리빙/주방',
  digital: '디지털',
  clothingAndStuff: '의류/잡화',
  productEtc: '기타',
  // 상황 (목적)
  birthday: '생일',
  moveHousewarming: '이사/집들이',
  admissionAndGraduation: '입학/졸업',
  leave: '퇴사/퇴직',
  employmentAndJobChange: '취업/이직',
  discharge: '전역',
  getWellVisit: '병문안',
  anniversary: '기념일',
  parenting: '출산/육아',
  situationEtc: '무관',
};
export type ConditionName = keyof typeof CONDITION_NAME;
export type ConditionType = ConditionName[] | null;
export type FilteringConditionType = {
  productType: ConditionType;
  gender: ConditionType;
  job: ConditionType;
  situation: ConditionType;
};
const onlineStoreShop = {
  brand: '브랜드',
  kakao: '카카오',
  coupang: '쿠팡',
  naver: '네이버',
} as const;
type OnlineStoreType = {
  name: keyof typeof onlineStoreShop;
  url: string;
};

// 상품 type (임시) - full screen modal type
export type FullScreModalType = {
  //class1,2 ,agePart,situation,emotion,gender, preference 에 들어갈 세부 type은 추후에 정할 예정
  name: string;
  // 회원이 해당 상품을 저장했는 지 여부
  saved: boolean;
  // full screen modal 용 큰 이미지 필요 (1:1 비율)
  img: string;
  price: number;
  store: {
    online: OnlineStoreType[];
  };
  introduction: string;
  //기획팀이 상품데이터 전달 때 같이 전달할 예정
  tag: string[];
};
