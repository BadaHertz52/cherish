import React, { useState ,useEffect} from "react";
import AlertModal from "./AlertModal";
import '../../assets/modal.scss';
import ConfirmModal from "./ConfirmModal";
import BottomNavModal from "./BottomNavModal";
import { confirmModalType, filteringConditionType, fullScreModalType, modalCommonType, toastModalType } from "./modalTypes";
import ToastModal from "./ToastModal";
import '../../assets/modalTest.scss';
import FullScreModal from "./FullScreModal";
import sampleImg from '../../assets/product_sample.jpg';
const ModalTest=()=>{
  // 모달 창 기능을 보기 위한 코드로 , 실제 사용에는 필요 없습니다. 추후 삭제 예정 
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
  //사용자가 선택한 필터링 조건
  const selectedFilteringCondition:filteringConditionType ={productType:null,
    gender:null,
    job:null,
    situation:null
  };
  const fullScreModalState :fullScreModalType ={
    name: "product name",
    saved: true,
    img: sampleImg,
    price: 10000,
    store: {
        online:[{name:"네이버", url:'/'}, 
        {name:"브랜드", url:'/'},
        {name:"쿠팡", url:'/'},
        {name:"카카오", url:'/'}
              ] ,
        offline:"서울특별시 종로구"
    },
    onlineIntroduction: "test test test test test test test test test test test test test test test test test test test test " ,
    tag:["tag1", "tag2", "tag3", "tag4"]
  } 
  const [toastModalState, setToastModalState] =useState<toastModalType |null>(null);
  /**
   * 모달 창 기능 테스트를 위한 함수로 , 테스트 이후 실제 사용 단계에서 삭제
   */
  useEffect(()=>{
    const bottomModalEl= document.querySelector(".bottom-nav-modal") as HTMLElement|null;
    if(openTarget === "bottom"){
      bottomModalEl?.classList.add("on");
      setTimeout(() => {
        if(bottomModalEl !==null){
          // top의 값: 추후에 bottomNavModal 디자인이 완성되면 수정
          bottomModalEl.style.top  = "20vh"
        }
      }, 200);
    }else{
      bottomModalEl?.classList.remove("on");
    };
    // toast modal
    if(openTarget === "toast"){
      // toast modal이 열려야하는 위치에 해당하는 element의 domRect
      const targetElDomRect = document.getElementById("toast-modal-target")?.getBoundingClientRect();
      if(targetElDomRect !==undefined){
        setToastModalState ({
          contents:"toast modal!!!",
          top: `${targetElDomRect.top}px`,
          left :`${targetElDomRect.left}px`
        })
      };
    };

  },[openTarget]);

  return(
    <div id="modal-test">
      <div className="btns">
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
        <button 
          type="button"
          onClick={()=>setOpenTarget("toast")}
        >
          open toast modal
        </button>
        <button 
          type="button"
          onClick={()=>setOpenTarget("full")}
        >
          open full screen modal
        </button>
      </div>
      <div id="toast-modal-target">
        여기에 toast modal 열기 
      </div>
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
    {openTarget === "toast" && toastModalState !== null &&
      <ToastModal
        modalState={toastModalState}
        closeModal={()=> setOpenTarget(null)}
      />
    }
    {openTarget ==="full" && 
      <FullScreModal
        modalState={fullScreModalState}
        closeModal={()=>setOpenTarget(null)}
      />
    }
      <BottomNavModal
        selectedFilteringCondition={selectedFilteringCondition}
        closeModal={()=> setOpenTarget(null)}
      />
    </div>
  )
};

export default React.memo(ModalTest)