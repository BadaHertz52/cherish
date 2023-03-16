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
// alert ,toast  modal - modalComonType 
export type modalCommonType ={
  contents: string
};
export type confirmModalType =modalCommonType &{
  title:string|null,
  yesBtn:confirmModalBtnType,
  noBtn: confirmModalBtnType
};
export type conditionType = string[]|null ;
export type filterConditionType ={
  productType : conditionType,
  gender :conditionType,
  job :conditionType,
  situation :conditionType
};
// 상품 type (임시) - full screen modal type
export type itemType ={
  //class1,2 ,agePart,situation,emotion,gender, preference 에 들어갈 세부 type은 추후에 정할 예정 
  goods :{
    class1:string,
    class2:string |null
  },
  price:number,
  onlineStoreUrl: { brand:string | null ,
              kakao :string |null,
              coupang:string |null,
              naver:string |null
            },
  offlineStore : string|null,
  description:string|null ,
  job:{
    class1:string,
    class2:string|null
  },
  // 상품 데이터 구조는 6단계로 추후에 그렇게 진행하면 될 것 같음
  agePart :number ,
  situation:string,
  emotion:string,
  gender:string,
  preference:string
};