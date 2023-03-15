import  {  useEffect,  useState } from "react";
import Modal from "./Modal";

const productType ="productType";
const gender ="gender";
const job ="job";
const situation ="situation"; 

type categoryType = typeof productType |typeof gender | typeof job | typeof situation ;

type conditionType = string[]|null ;

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
};

type BottomNavModalProps ={
  closeModal : ()=>void
};
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

const CheckBox =({item}:CheckBoxProps)=>{
  return (
    <div className="checkbox">
      <input 
        type="checkbox" 
        id={item.name} 
        name={item.name}
      />
      <label htmlFor={item.name}> {item.label}</label>
    </div>
    
  )
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
  /**
   * A function that detects changes in checkboxes , updates the state of filterCondition , return it, and if the value of recovery is true, changes the checked attribute of checkboxes that are currently checked to false
   * @param recovery 
   * @returns 
   */
  const updateFilterContent =( recovery:boolean) =>{
    const checked :NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]:checked');
    const nameArry =Array.from(checked).map((el)=> el.name);
    const newCondition = nameArry[0] === undefined? null: nameArry;
    let newFilterCondition:fileterConditionType ={
      ...filterCondition 
    };
    // 현재 화면에서 보여지는 카테고리에서 선택된 필터링 조건들을 newFilerCondition 에 반영
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
    if(recovery){
    // checked를 풀지 않으면 카테고리 이동시, 해당 카테고리에서 선택되지 않은 box가 선택되는 오류 일어남
      checked.forEach((el)=>{el.checked =false});
    };
    setFilterCondition(newFilterCondition);
    return newFilterCondition
  };
  /**
   * A function that displays specific categories and checkboxes on the screen depending on the value of an item after update filterCondtion and targetCondition
   * @param item 
   * @param index  : categoryArry.indexOf(item)
   */
  const onClickCategoryBtn =(item: categoryType , index :number)=>{
    
    // set filerCondition 
    const newFilterCondition = updateFilterContent(true); 
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
    setCategory(item); 
    setCheckBoxArry(arryOfCheckBoxArry[index]);
  };
  const onClickSubmitBtn =()=>{
    updateFilterContent(false);
    closeModal();
  };
  useEffect(()=>{
    if(targetCondition !==null){
      const checkBoxEl :NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
      // targetCondition 의 값을 이용해, 사용자가 이미 선택한 필터링 조건인 경우 checked 표시함 
      checkBoxEl.forEach((el)=> {
        if(targetCondition.includes(el.name)){
          el.checked =true;
        }
    })
    }
  },[targetCondition]);
  return(
    <Modal>
      <form action="">
        <div className="category">
          {categoryArry.map((v,i)=>
          <button
            key ={`cateogryBtn_${i}`}
            type="button"
            className="category-btn"
            onClick={()=>category !== v && onClickCategoryBtn(v,i)}
          >
            {categoryBtnTextArry[i]}
          </button>)}
        </div>
        <div className="checkBoxs">
          {checkBoxArry.map((v,i)=> <CheckBox 
                                    key ={`checkbox_${i}`}
                                    item ={v} 
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