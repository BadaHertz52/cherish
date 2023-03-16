import React, { useState ,useEffect} from "react";
import AlertModal from "./AlertModal";
import '../../assets/modal.scss';
import ConfirmModal from "./ConfirmModal";
import BottomNavModal from "./BottomNavModal";
import { confirmModalType, filterConditionType, modalCommonType } from "./modalTypes";


const ModalTest=()=>{
  // 모달 창 기능을 보기 위한 코드로 , 실제 사용에는 필요 없습니다. 
  const [openTarget , setOpenTarget] =useState<string|null>("alert");
  const alertModalState :modalCommonType = {
    contents: "alert",
  };
  const confirmModalState :confirmModalType = {
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
  const selectedFilterCondition:filterConditionType ={productType:null,
    gender:null,
    job:null,
    situation:null
 };
  /**
   * 모달 창 기능 테스트를 위한 함수로 , 테스트 이후 실제 사용 단계에서 삭제
   */
  useEffect(()=>{
    const bottomModalEle= document.querySelector(".bottom-nav-modal") as HTMLElement|null;
    if(openTarget === "bottom"){
      bottomModalEle?.classList.add("on");
      setTimeout(() => {
        if(bottomModalEle !==null){
          // top의 값: 추후에 bottomNavModal 디자인이 완성되면 수정
          bottomModalEle.style.top  = "20vh"
        }
      }, 200);
    }else{
      bottomModalEle?.classList.remove("on");
    }
  },[openTarget]);

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
        <button 
          type="button"
          onClick={()=>setOpenTarget("bottom")}
        >
          open bottom nav modal
        </button>
    { openTarget ==="alert" &&
      <AlertModal
        modalState={alertModalState}
        closeModal ={()=> setOpenTarget(null)}
      />
    }
    {openTarget == "confirm"  &&
      <ConfirmModal
        modalState={confirmModalState}
        closeModal ={()=> setOpenTarget(null)}
      />
    }
      <BottomNavModal
        selectedFilterCondition={selectedFilterCondition}
        closeModal={()=> setOpenTarget(null)}
      />
    </div>
  )
};

export default React.memo(ModalTest)