/**
 * confirm modal의 yes/no 버튼 type
 */
export type confirmModalBtnType ={
  //btn 의 text node
  text:string, 
  //btn 클릭 시 이동해야 할 페이지의 경로
  path: null | string,
  //btn 클릭 시 이동/창 닫기 외의 필요한 기능
  otherFn : (()=>void) | null
};
// alert modal - modalComonType 
export type modalCommonType ={
  contents: string
};
export type confirmModalType =modalCommonType &{
  title:string|null,
  yesBtn:confirmModalBtnType,
  noBtn: confirmModalBtnType
};
/**
 * the unit for top and left is px
 */
export type toastModalType = modalCommonType & {
  top:string, // unit: px
  left: string
}
export type conditionType = string[]|null ;
export type filterConditionType ={
  productType : conditionType,
  gender :conditionType,
  job :conditionType,
  situation :conditionType
};
const brand ="브랜드";
const kakao ="카카오";
const coupang ="쿠팡";
const naver ="네이버"; 
type onlineStore = {
  name: typeof brand|typeof kakao |typeof coupang |typeof naver,
  url :string
}
// 상품 type (임시) - full screen modal type
export type fullScreModalType ={
  //class1,2 ,agePart,situation,emotion,gender, preference 에 들어갈 세부 type은 추후에 정할 예정 
  name:string,
  // 회원이 해당 상품을 저장했는 지 여부 
  saved : boolean,
  // full screen modal 용 큰 이미지 필요 (1:1 비율)
  img : string,
  price:number,
  store :{
    online : onlineStore[],
    offline :string|null
  },
  oneLineIntroduction:string,
  //기획팀이 상품데이터 전달 때 같이 전달할 예정
  tag : string[]
};