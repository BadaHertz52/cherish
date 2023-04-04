/**
 * confirm modal의 yes/no 버튼 type
 */
export type ConfirmModalBtnType = {
  //btn 의 text node
  text: string;
  //btn 클릭 시 이동해야 할 페이지의 경로
  path: null | string;
  //btn 클릭 시 이동/창 닫기 외의 필요한 기능
  otherFn: (() => void) | null;
};
// alert modal - modalCommonType (모달의 공통적인 것들)
export type ModalCommonType = {
  contents: string;
};
export type ConfirmModalType = ModalCommonType & {
  title: string | null;
  yesBtn: ConfirmModalBtnType;
  noBtn: ConfirmModalBtnType;
};
/**
 * the unit for top and left is px
 */
export type ToastModalType = ModalCommonType & {
  top: string; // unit: px
  left: string;
};
const conditionName = {
  food: 'food',
  beauty: 'beauty',
  living: 'living',
  digital: 'digital',
  productEtc: 'productEtc',
  male: 'male',
  female: 'female',
  irrelevant: 'irrelevant', //무관
  profession: 'profession',
  management: 'management',
  desk: 'desk',
  service: 'service',
  blueCollar: 'blueCollar',
  selfEmployment: 'selfEmployment',
  student: 'student',
  homemaker: 'homemaker',
  outOfWork: ' outOfWork', //무직
  jobEtc: 'jobEtc',
  birthday: 'birthday',
  moveHousewarming: 'moveHousewarming',
  admissionAndGraduation: 'admissionAndGraduation',
  leave: 'leave',
  employmentAndJobChange: 'employmentAndJobChange',
  discharge: 'discharge', //전역
  getWellVisit: 'getWellVisit', //병문안
} as const;
export type ConditionName = keyof typeof conditionName;
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
