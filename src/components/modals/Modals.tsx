import React, {  useState} from "react";
import AlertModal from "./AlertModal";
import '../../assets/modal.scss';
import ConfirmModal from "./ConfirmModal";

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
// alert ,toast  modal - modalComonType 
export type modalCommonType ={
  contents: string
};
export type confrimModalType =modalCommonType &{
  title:string|null,
  yesBtn:confirmModalBtnType,
  noBtn: confirmModalBtnType
};
const Modals=()=>{
  // 모달 창 기능을 보기 위한 코드로 , 실제 사용에는 필요 없습니다. 
  const [openTarget , setOpenTarget] =useState<string|null>("alert");
  const alertModalState :modalCommonType = {
    contents: "alert",
  };
  const confirmModalState :confrimModalType = {
    title:"title",
    contents: "contents",
    yesBtn:{
      text:"yes",
      path:null,
      otherFn:null
    },
    noBtn:{
      text:"no",
      path:null,
      otherFn:null
    }
  };
  
  /**
   * 모달 창 기능 테스트를 위한 함수로 , 테스트 이후 실제 사용 단계에서 삭제
   */

  return(
    <div id="modals">
        <button 
          type="button"
          onClick={()=>setOpenTarget("alert")}
        >
          open alert modal
        </button>
        <button 
          type="button"
          onClick={()=>setOpenTarget("confirm")}
        >
          open confirm modal
        </button>
    { openTarget ==="alert" &&
      <AlertModal
        item={alertModalState}
        closeModal ={()=> setOpenTarget(null)}
      />
    }
    {openTarget == "confirm"  &&
      <ConfirmModal
        item={confirmModalState}
        closeModal ={()=> setOpenTarget(null)}
      />
    }
    </div>
  )
};

export default React.memo(Modals)