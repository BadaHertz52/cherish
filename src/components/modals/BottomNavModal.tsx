import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
const productType ="produtType";
const gender ="gender";
const job ="job";
const situation ="situation"; 

type categoryType = typeof productType |typeof gender | typeof job | typeof situation ;

// checkBoxType 의 name은 추후 필터링 조건명에 따라 수정
const productTypeCheckBoxArry:checkBoxType[] =[
  {name:"food", label:"식품"},
  {name:"beauty", label:"뷰티"},
  {name:"living", label:"리빙/주방"},
  {name:"digital", label:"디지털/가전"},
  {name:"etc", label:"기타"}
];
const genderCheckBoxArry :checkBoxType[]  =[
  {name:"male", label:"남"},
  {name:"female", label:"여"},
  {name:"irrelevant", label:"무관"},
];
const jobCheckBoxArry :checkBoxType[]  =[
  {name:"profession", label:"전문직"},
  {name:"management", label:"경영/관리직"},
  {name:"desk", label:"사무직"},
  {name:"service", label:"판매/서비스직"},
  {name:"blue-collar", label:"노동/생산직"},
  {name:"self-employment", label:"자영업"},
  {name:"student", label:"학생"},
  {name:"homemaker", label:"전업주부"},
  {name:"inoccupation", label:"무직"},
  {name:"etc", label:"기타"},
];
const situationCheckBoxArry :checkBoxType[] =[
  {name:"birthday", label:"생일"},
  {name:"move-housewarming", label:"이사/집들이"},
  {name:"admission-graduation", label:"입학/졸업"},
  {name:"leave", label:"퇴사/퇴직"},
  {name:"employment-jobchange", label:"취업/이직"},
  {name:"discharge", label:"전역"},
  {name:"get-well-visit", label:"병문안"}
];
type conditionType = string[]|null
type fileterConditionType ={
  productType : conditionType,
  gender :conditionType,
  job :conditionType,
  situation :conditionType
};
type checkBoxType ={
  name:string,
  label:string
};
type CheckBoxProps ={
  item: checkBoxType,
  targetCondition:conditionType,
  setTargetCondition: Dispatch<SetStateAction<conditionType>>
}
const CheckBox =({item ,targetCondition ,setTargetCondition}:CheckBoxProps)=>{
  const checkBoxRef= useRef<HTMLInputElement>(null);
  const isInCondition =targetCondition?.includes(item.name)
  const onChange =()=>{
    if(isInCondition && targetCondition !==null){
      setTargetCondition([...targetCondition].filter((i)=> i !== item.name));
    }else{
      targetCondition === null?
      setTargetCondition([item.name]):
      setTargetCondition([...targetCondition, item.name])
    }
  }
  return (
    <div className="checkbox">
      <input 
        type="checkbox" 
        ref={checkBoxRef}
        id={item.name} 
        name={item.name}
        checked={isInCondition}
        onChange={onChange}
      />
      <label htmlFor={item.name}> {item.label}</label>
    </div>
    
  )
};
type BottomNavModalProps ={
  closeModal : ()=>void
};
const BottomNavModal =({closeModal}:BottomNavModalProps)=>{
  const [category, setCategory]= useState<categoryType>(productType);
  const [checkBoxArry, setCheckBoxArry] =useState<checkBoxType[]>(productTypeCheckBoxArry);

  const [filterCondition, setFilterCondition] =useState<fileterConditionType>({productType:null,
                                                                              gender:null,
                                                                              job:null,
                                                                              situation:null
                                                                            });
  //CheckBox에서 이미 선택된 조건들이 표시 되는데 사용
  const [targetCondition,setTargetCondition] = useState<conditionType>(filterCondition.productType);
  const categoryArry :categoryType[] =[productType, gender, job,situation];
  const categoryBtnTextArry =["상품유형", "성별" ,"직업","상황"];
  const arryOfCheckBoxArry =[productTypeCheckBoxArry, genderCheckBoxArry, jobCheckBoxArry, situationCheckBoxArry];
  const updateFilterContent =(newCondition:conditionType) =>{
    let newFilterCondition:fileterConditionType ={
      ...filterCondition 
    };
    // 현재 화면에서 보여지는 카테코리에서 선택된 필터링 조건들을 newFilerCondition 에 반영
    switch (category) {
      case productType:
        newFilterCondition.productType = newCondition; 
        break;
      case gender :
        newFilterCondition.gender =newCondition;
        break;
      case job :
        newFilterCondition.job =newCondition;
        break;
      case situation :
        newFilterCondition.situation =newCondition;
        break;
      default:
        break;
    };
    setFilterCondition(filterCondition);
    return newFilterCondition;
  };
  /**
   * A function that displays specific categories and checkboxes on the screen depending on the value of an item
   * @param item 
   * @param index  : categoryArry.indexOf(item)
   */
  const onClickCategoryBtn =(item: categoryType , index :number)=>{
    const checked :NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]:checked');
    checked.forEach((el)=>{el.checked =false});
    // set filerCondition 
    const newFilterCondition = targetCondition === null ? filterCondition : updateFilterContent(targetCondition);
    //set targetCondition 
    switch (item) {
      case productType:
        setTargetCondition(newFilterCondition.productType)
        break;
      case gender :
        setTargetCondition(newFilterCondition.gender)
        break;
      case job :
        setTargetCondition(newFilterCondition.job)
        break;
      case situation :
        setTargetCondition(newFilterCondition.situation)
        break;
      default:
        break;
    }
    setFilterCondition(newFilterCondition);
    setCategory(item); 
    setCheckBoxArry(arryOfCheckBoxArry[index]);
  };
  const onClickSubmitBtn =()=>{
    closeModal();
  };
  useEffect(()=>{
    console.log("targetcondition", targetCondition)
    console.log("filtercondtion", filterCondition)
  },[filterCondition ,targetCondition])
  return(
    <Modal>
      <form action="">
        <div className="category">
          {categoryArry.map((v,i)=>
          <button
            type="button"
            className="category-btn"
            onClick={()=>onClickCategoryBtn(v,i)}
          >
            {categoryBtnTextArry[i]}
          </button>)}
        </div>
        <div className="checkBoxs">
          {checkBoxArry.map((i)=> <CheckBox 
                                    item ={i} 
                                    targetCondition={targetCondition}
                                    setTargetCondition={setTargetCondition}
                                  />
                            )
          }
        </div>
        <button
          type="submit"
          onClick={onClickSubmitBtn}
        >
          필터링 하기
        </button>
      </form>

    </Modal>
  )
};
export default BottomNavModal;