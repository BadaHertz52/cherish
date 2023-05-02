import { useEffect, useState, TouchEvent } from 'react';

import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Checkbox from '@/components/CheckBox';
import {
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
};
const PRODUCT_TYPE_CHECK_BOX_ARR: CheckBoxType[] = [
  { name: 'food' },
  { name: 'beauty' },
  { name: 'living' },
  { name: 'digital' },
  { name: 'clothingAndStuff' },
  { name: 'productEtc' },
];
const GENDER_CHECK_BOX_ARR: CheckBoxType[] = [{ name: 'male' }, { name: 'female' }];
const JOB_CHECK_BOX_ARR: CheckBoxType[] = JOB_ARR;
const SITUATION_CHECK_BOX_ARR: CheckBoxType[] = [
  { name: 'birthday' },
  { name: 'moveHousewarming' },
  { name: 'admissionAndGraduation' },
  { name: 'leave' },
  { name: 'employmentAndJobChange' },
  { name: 'discharge' },
  { name: 'getWellVisit' },
  { name: 'anniversary' },
  { name: 'parenting' },
  { name: 'situationEtc' },
];
/**
 * sendData:서버에 새로운 필터링 조건 보내고 서버에서 받은 새로운 필터링 결과를 검색 결과 페이지에 보여주는 기능
 */
export type BottomNavModalProps = {
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
  const [targetCondition, setTargetCondition] = useState<string[] | null>(
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
  const onChangeCheckBox = (name: string) => {
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
    const newCondition = !nameArr[0] ? null : nameArr.map(i => CONDITION_NAME[i]);
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
    updateFilteringCondition();
    setCategory(item);
    setTargetCondition(filteringCondition[item]);
    setCheckBoxArr(arrOfCheckBoxArr[index]);
  };
  const onClickSubmitBtn = () => {
    const newFilteringCondition = updateFilteringCondition();
    sendData(newFilteringCondition);
    if (MODAL_EL) {
      MODAL_EL.style.top = '105vh';
    }
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
          MODAL_EL.style.top = `56vh`;
        }
      }, 50);
      MODAL_BACKGROUND_EL?.addEventListener('click', event => closeBottomNavModal(event));
    } else {
      BOTTOM_MODAL_El?.classList.remove('on');
      MODAL_BACKGROUND_EL?.removeEventListener('click', closeBottomNavModal);
    }
  }, [openBottomNavModal]);

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
              title="reset-checkbox"
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
        <div className={`check-box-group-container ${checkBoxArr.length > 8 ? 'scroll' : ''}`}>
          <div className="checkbox-group">
            {checkBoxArr.map((v, i) => (
              <Checkbox
                key={`checkbox_${i}`}
                id={v.name}
                name={v.name}
                label={CONDITION_NAME[v.name]}
                isChecked={
                  targetCondition
                    ? () => targetCondition.includes(CONDITION_NAME[v.name])
                    : () => false
                }
                onChange={() => onChangeCheckBox(CONDITION_NAME[v.name])}
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
