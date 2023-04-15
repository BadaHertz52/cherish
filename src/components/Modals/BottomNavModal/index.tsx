import { useEffect, useState, TouchEvent } from 'react';

import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Checkbox from '@/components/CheckBox';
import {
  ConditionType,
  FilteringConditionType,
  ConditionName,
  CONDITION_NAME,
} from '@/components/Modals/modalTypes';
import { JOB_ARR } from '@/pages/SignUp/signUpTypes';

import BottomNavModalPortal from '../BottomNavModalPortal';
import './style.scss';
const CATEGORY = {
  productType: 'productType',
  gender: 'gender',
  job: 'job',
  situation: 'situation',
} as const;
type CategoryType = keyof typeof CATEGORY;
type CheckBoxType = {
  name: ConditionName;
  label: string;
};

// CheckBoxType 의 name은 추후 필터링 조건명에 따라 수정
const PRODUCT_TYPE_CHECK_BOX_ARR: CheckBoxType[] = [
  { name: CONDITION_NAME.food as ConditionName, label: '식품' },
  { name: CONDITION_NAME.beauty as ConditionName, label: '뷰티' },
  { name: CONDITION_NAME.living as ConditionName, label: '리빙/주방' },
  { name: CONDITION_NAME.digital as ConditionName, label: '디지털/가전' },
  { name: CONDITION_NAME.productEtc as ConditionName, label: '기타' },
];
const GENDER_CHECK_BOX_ARR: CheckBoxType[] = [
  { name: CONDITION_NAME.male as ConditionName, label: '남' },
  { name: CONDITION_NAME.female as ConditionName, label: '여' },
  { name: CONDITION_NAME.irrelevant as ConditionName, label: '무관' },
];
const JOB_CHECK_BOX_ARR: CheckBoxType[] = JOB_ARR;
const SITUATION_CHECK_BOX_ARR: CheckBoxType[] = [
  { name: CONDITION_NAME.birthday as ConditionName, label: '생일' },
  { name: CONDITION_NAME.moveHousewarming as ConditionName, label: '이사/집들이' },
  { name: CONDITION_NAME.admissionAndGraduation as ConditionName, label: '입학/졸업' },
  { name: CONDITION_NAME.leave as ConditionName, label: '퇴사/퇴직' },
  { name: CONDITION_NAME.employmentAndJobChange as ConditionName, label: '취업/이직' },
  { name: CONDITION_NAME.discharge as ConditionName, label: '전역' },
  { name: CONDITION_NAME.getWellVisit as ConditionName, label: '병문안' },
];
/**
 * sendData:서버에 새로운 필터링 조건 보내고 서버에서 받은 새로운 필터링 결과를 검색 결과 페이지에 보여주는 기능
 */
type BottomNavModalProps = {
  selectedFilteringCondition: FilteringConditionType;
  openBottomNavModal: boolean;
  sendData: (filteringCondition: FilteringConditionType) => void;
  closeModal: () => void;
};
const BottomNavModal = ({
  selectedFilteringCondition,
  openBottomNavModal,
  sendData,
  closeModal,
}: BottomNavModalProps) => {
  const [category, setCategory] = useState<CategoryType>('productType');
  const [checkBoxArr, setCheckBoxArr] = useState<CheckBoxType[]>(PRODUCT_TYPE_CHECK_BOX_ARR);
  const [filteringCondition, setFilteringCondition] = useState<FilteringConditionType>(
    selectedFilteringCondition,
  );
  //CheckBox에서 이미 선택된 조건들이 표시 되는데 사용
  const [targetCondition, setTargetCondition] = useState<ConditionType>(
    filteringCondition[category],
  );
  const categoryArr: CategoryType[] = [
    CATEGORY.productType,
    CATEGORY.gender,
    CATEGORY.job,
    CATEGORY.situation,
  ];
  const categoryBtnTextArr = ['상품유형', '성별', '직업', '상황'];
  const arrOfCheckBoxArr = [
    PRODUCT_TYPE_CHECK_BOX_ARR,
    GENDER_CHECK_BOX_ARR,
    JOB_CHECK_BOX_ARR,
    SITUATION_CHECK_BOX_ARR,
  ];
  const BOTTOM_MODAL_El = document.querySelector('.bottom-nav-modal') as HTMLElement | null;
  const MODAL_BACKGROUND_EL = document.querySelector('.bottom-nav-modal .modal__background');
  const MODAL_EL = BOTTOM_MODAL_El?.querySelector('.modal__box') as HTMLElement | null | undefined;
  const onChangeCheckBox = (name: ConditionName) => {
    const checked = targetCondition?.includes(name);
    if (checked && targetCondition) {
      const newTargetCondition = targetCondition.filter(i => i !== name);
      setTargetCondition(newTargetCondition || null);
    } else {
      targetCondition ? setTargetCondition([...targetCondition, name]) : setTargetCondition([name]);
    }
  };
  /**
   * A function that detects changes in checkboxes , updates the state of filteringCondition , return it, and if the value of recovery is true, changes the checked attribute of checkboxes that are currently checked to false
   * @param recovery
   * @returns
   */
  const updateFilteringCondition = () => {
    const selectedList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    );
    const nameArr = [...selectedList].map(el => el.name) as ConditionName[];
    const newCondition = !nameArr[0] ? null : nameArr;
    const newFilteringCondition: FilteringConditionType = {
      ...filteringCondition,
    };
    // 현재 화면에서 보여지는 카테고리에서 선택된 필터링 조건들을 newFilerCondition 에 반영
    newFilteringCondition[category] = newCondition;
    setFilteringCondition(newFilteringCondition);
    return newFilteringCondition;
  };
  /**
   * A function that displays specific categories and checkboxes on the screen depending on the value of an item after update filteringCondition and targetCondition
   * @param item
   * @param index  : categoryArr.indexOf(item)
   */
  const onClickCategoryBtn = (item: CategoryType, index: number) => {
    // set filteringCondition
    updateFilteringCondition();
    setCategory(item);
    setCheckBoxArr(arrOfCheckBoxArr[index]);
  };
  const onClickSubmitBtn = () => {
    const newFilteringCondition = updateFilteringCondition();
    sendData(newFilteringCondition);
    closeModal();
  };
  const closeBottomNavModal = (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.modal__box') && BOTTOM_MODAL_El) {
      if (MODAL_EL) {
        MODAL_EL.style.top = '105vh';
      }
      setTimeout(() => {
        closeModal();
      }, 1000);
    }
  };
  const onClickResetBtn = () => {
    setFilteringCondition(selectedFilteringCondition);
    setTargetCondition(selectedFilteringCondition[category]);
  };
  const onTouchResetBtn = (event: TouchEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.classList.toggle('on');
  };
  useEffect(() => {
    if (openBottomNavModal) {
      BOTTOM_MODAL_El?.classList.add('on');
      setTimeout(() => {
        if (MODAL_EL) {
          MODAL_EL.style.top = `54vh`;
        }
      }, 50);
      MODAL_BACKGROUND_EL?.addEventListener('click', event => closeBottomNavModal(event));
    } else {
      BOTTOM_MODAL_El?.classList.remove('on');
      MODAL_BACKGROUND_EL?.removeEventListener('click', closeBottomNavModal);
    }
  }, [openBottomNavModal]);

  useEffect(() => {
    if (filteringCondition) {
      //set targetCondition
      setTargetCondition(filteringCondition[category]);
    }
  }, [category, filteringCondition]);
  return (
    <BottomNavModalPortal>
      <section>
        <div className="category">
          <div className="btn-group">
            {categoryArr.map((v, i) => (
              <button
                key={`categoryBtn_${i}`}
                type="button"
                className={`category-btn ${category === v ? 'on' : ''}`}
                onClick={() => category !== v && onClickCategoryBtn(v, i)}
              >
                {categoryBtnTextArr[i]}
              </button>
            ))}
            <button
              type="button"
              className="btn-reset"
              title={'reset checkbox'}
              onClick={onClickResetBtn}
              onTouchStart={event => onTouchResetBtn(event)}
              onTouchEnd={event => onTouchResetBtn(event)}
            >
              <FontAwesomeIcon icon={faRotateRight} />
              <span>초기화</span>
            </button>
          </div>
          <div className="bar"></div>
        </div>
        <div className="check-box-group-container">
          <div className="checkbox-group">
            {checkBoxArr.map((v, i) => (
              <Checkbox
                key={`checkbox_${i}`}
                id={v.name}
                name={v.name}
                label={v.label}
                isChecked={targetCondition ? () => targetCondition.includes(v.name) : () => false}
                onChange={() => onChangeCheckBox(v.name)}
              />
            ))}
          </div>
        </div>
      </section>
      <button type="button" className="btn-submit" onClick={onClickSubmitBtn}>
        필터링 하기
      </button>
    </BottomNavModalPortal>
  );
};
export default BottomNavModal;
