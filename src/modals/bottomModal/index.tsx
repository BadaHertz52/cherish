import { ChangeEvent, useEffect, useState } from 'react';
import BottomNavModalPortal from './ModalPortal';
import { ConditionType, FilteringConditionType } from '../modalTypes';
import CheckBox from '../../checkbox';
import './style.scss';

const category = {
  productType: 'productType',
  gender: 'gender',
  job: 'job',
  situation: 'situation',
} as const;
type CategoryType = keyof typeof category;
type CheckBoxType = {
  name: string;
  label: string;
};

// CheckBoxType 의 name은 추후 필터링 조건명에 따라 수정
const productTypeCheckBoxArr: CheckBoxType[] = [
  { name: 'food', label: '식품' },
  { name: 'beauty', label: '뷰티' },
  { name: 'living', label: '리빙/주방' },
  { name: 'digital', label: '디지털/가전' },
  { name: 'etc', label: '기타' },
];
const genderCheckBoxArr: CheckBoxType[] = [
  { name: 'male', label: '남' },
  { name: 'female', label: '여' },
  { name: 'irrelevant', label: '무관' },
];
const jobCheckBoxArr: CheckBoxType[] = [
  { name: 'profession', label: '전문직' },
  { name: 'management', label: '경영/관리직' },
  { name: 'desk', label: '사무직' },
  { name: 'service', label: '판매/서비스직' },
  { name: 'blue-collar', label: '노동/생산직' },
  { name: 'self-employment', label: '자영업' },
  { name: 'student', label: '학생' },
  { name: 'homemaker', label: '전업주부' },
  { name: 'out-of-work', label: '무직' },
  { name: 'etc', label: '기타' },
];
const situationCheckBoxArr: CheckBoxType[] = [
  { name: 'birthday', label: '생일' },
  { name: 'move-housewarming', label: '이사/집들이' },
  { name: 'admission-graduation', label: '입학/졸업' },
  { name: 'leave', label: '퇴사/퇴직' },
  { name: 'employment-job-change', label: '취업/이직' },
  { name: 'discharge', label: '전역' },
  { name: 'get-well-visit', label: '병문안' },
];

type BottomNavModalProps = {
  selectedFilteringCondition: FilteringConditionType;
  openBottomNavModal: boolean;
  closeModal: () => void;
};
const BottomNavModal = ({
  selectedFilteringCondition,
  openBottomNavModal,
  closeModal,
}: BottomNavModalProps) => {
  const [category, setCategory] = useState<CategoryType>('productType');
  const [checkBoxArr, setCheckBoxArr] = useState<CheckBoxType[]>(productTypeCheckBoxArr);
  const [filteringCondition, setFilteringCondition] = useState<FilteringConditionType>(
    selectedFilteringCondition,
  );
  //CheckBox에서 이미 선택된 조건들이 표시 되는데 사용
  const [targetCondition, setTargetCondition] = useState<ConditionType>(null);
  const categoryArr: CategoryType[] = ['productType', 'gender', 'job', 'situation'];
  const categoryBtnTextArr = ['상품유형', '성별', '직업', '상황'];
  const arrOfCheckBoxArr = [
    productTypeCheckBoxArr,
    genderCheckBoxArr,
    jobCheckBoxArr,
    situationCheckBoxArr,
  ];
  const BOTTOM_MODAL_El = document.querySelector('.bottom-nav-modal') as HTMLElement | null;
  const modalBackgroundEl = document.querySelector('.bottom-nav-modal .modal__background');
  const modalBoxEl = BOTTOM_MODAL_El?.querySelector('.modal__box') as
    | HTMLElement
    | null
    | undefined;
  const changeLabelClass = (el: HTMLInputElement) => {
    const parentEl = el.parentElement;
    const targetLabelEl = parentEl?.lastElementChild;
    if (targetLabelEl !== null && targetLabelEl !== undefined) {
      if (el.checked) {
        targetLabelEl.classList.add('on');
      } else {
        targetLabelEl.classList.remove('on');
      }
    }
  };
  const onChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    changeLabelClass(target);
  };
  /**
   * A function that detects changes in checkboxes , updates the state of filteringCondition , return it, and if the value of recovery is true, changes the checked attribute of checkboxes that are currently checked to false
   * @param recovery
   * @returns
   */
  const updateFilteringCondition = (recovery: boolean) => {
    const selectedList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    );
    const nameArr = [...selectedList].map(el => el.name);
    const newCondition = nameArr[0] === undefined ? null : nameArr;
    let newFilteringCondition: FilteringConditionType = {
      ...filteringCondition,
    };
    // 현재 화면에서 보여지는 카테고리에서 선택된 필터링 조건들을 newFilerCondition 에 반영
    newFilteringCondition[`${category}`] = newCondition;
    if (recovery) {
      // checked를 풀지 않으면 카테고리 이동시, 해당 카테고리에서 선택되지 않은 box가 선택되는 오류 일어남
      selectedList.forEach(el => {
        el.checked = false;
        changeLabelClass(el);
      });
    }
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
    updateFilteringCondition(true);
    setCategory(item);
    setCheckBoxArr(arrOfCheckBoxArr[index]);
  };
  const onClickSubmitBtn = () => {
    const newFilteringCondition = updateFilteringCondition(false);
    // 추가 해야하는 기능
    // 1. 새로운 필터링 조건들을 사용헤 검색
    //  2. 1.의 결과를 화면에 보여줌
    closeModal();
  };
  const closeBottomNavModal = (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.modal__box') && BOTTOM_MODAL_El !== null) {
      if (modalBoxEl !== null && modalBoxEl !== undefined) {
        modalBoxEl.style.top = '105vh';
      }
      setTimeout(() => {
        closeModal();
      }, 1000);
    }
  };
  useEffect(() => {
    if (openBottomNavModal) {
      BOTTOM_MODAL_El?.classList.add('on');
      setTimeout(() => {
        if (modalBoxEl !== null && modalBoxEl !== undefined) {
          modalBoxEl.style.top = `52vh`;
        }
      }, 50);
      modalBackgroundEl?.addEventListener('click', event => closeBottomNavModal(event));
    } else {
      BOTTOM_MODAL_El?.classList.remove('on');
      modalBackgroundEl?.removeEventListener('click', closeBottomNavModal);
    }
  }, [openBottomNavModal]);

  useEffect(() => {
    if (filteringCondition !== null) {
      //set targetCondition
      setTargetCondition(filteringCondition[`${category}`]);
    }
  }, [category, filteringCondition]);

  useEffect(() => {
    if (targetCondition !== null) {
      const checkBoxEl: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[type="checkbox"]');
      // targetCondition 의 값을 이용해, 사용자가 이미 선택한 필터링 조건인 경우 checked 표시함
      checkBoxEl.forEach(el => {
        if (targetCondition.includes(el.name)) {
          el.checked = true;
          changeLabelClass(el);
        }
      });
    }
  }, [targetCondition]);

  return (
    <BottomNavModalPortal>
      <form>
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
            </div>
            <div className="bar"></div>
          </div>
          <div className="checkbox-group">
            {checkBoxArr.map((v, i) => (
              <CheckBox
                key={`checkbox_${i}`}
                id={v.name}
                name={v.name}
                label={v.label}
                onChange={event => onChangeCheckBox(event)}
              />
            ))}
          </div>
        </section>
        <button type="submit" className="btn-submit" onClick={onClickSubmitBtn}>
          필터링 하기
        </button>
      </form>
    </BottomNavModalPortal>
  );
};
export default BottomNavModal;
