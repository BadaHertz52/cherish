import { Dispatch, SetStateAction, useContext } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { SignUpContext } from '@/pages/SignUp';

import {
  BirthStateType,
  GenderStateType,
  GenderType,
  InputDataType,
  PROGRESS_ARR,
  SignUpSessionDataKeyType,
  SignUpSessionDataType,
  SignUpStateType,
} from '../signUpTypes';

/**
 *  sessionStorage에 target에 대한 정보가 있을 경우, setState로 target에 대한 상태를 업데이트한다.
 * @param target
 * @param setState
 * @param removeItem; sessionStorage 에서 해당 item을 삭제하는 지 여부
 */
export const getPrevData = (
  target: SignUpSessionDataKeyType,
  setInputDataState?: Dispatch<SetStateAction<InputDataType>>,
  setGenderState?: Dispatch<SetStateAction<GenderStateType>>,
  setBirthState?: Dispatch<SetStateAction<BirthStateType>>,
) => {
  const item = sessionStorage.getItem('signUpBackUpData');
  if (item) {
    const prevData: SignUpSessionDataType[] = JSON.parse(item);
    const prevState = prevData.find(i => i.key === target);
    if (prevState) {
      if (setInputDataState) {
        setInputDataState({
          value: prevState.value,
        });
      }
      if (setGenderState) {
        setGenderState({
          value: prevState.value as GenderType,
        });
      }
      if (setBirthState) {
        const arr = prevState.value.split('/');
        setBirthState({
          value: {
            year: arr[0],
            month: arr[1],
            date: arr[2],
          },
        });
      }
    }
  }
};
type SignUpTopBarProps = {
  openAuthNumberForm: boolean;
  setOpenAuthNumberForm: Dispatch<SetStateAction<boolean>>;
};
const SignUpTopBar = ({ openAuthNumberForm, setOpenAuthNumberForm }: SignUpTopBarProps) => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const navigate = useNavigate();
  const setItem = (item: SignUpSessionDataType[]) => {
    sessionStorage.setItem('signUpBackUpData', JSON.stringify(item));
  };
  /**
   * 현재 페이지에서 작성한 내용을 sessionStorage 에 저장
   */
  const saveData = () => {
    if (
      signUpState.progress === 'email' ||
      signUpState.progress === 'nameAndNickName' ||
      signUpState.progress === 'pw'
    ) {
      const listOfInputEl = document.querySelectorAll(
        '.input-form input',
      ) as NodeListOf<HTMLInputElement>;
      if (listOfInputEl[0]) {
        const backUpDataArr: SignUpSessionDataType[] = [...listOfInputEl].map(
          (el: HTMLInputElement) => ({
            key: el.id.replace('input-', '') as SignUpSessionDataKeyType,
            value: el.value,
          }),
        );
        backUpDataArr[0] && setItem(backUpDataArr);
      }
    }
    if (signUpState.progress === 'genderAndBirth') {
      const backUpData: SignUpSessionDataType[] = [];
      //gender
      const targetBtnEl = document.querySelector('.btn-gender.on') as HTMLButtonElement | null;
      if (targetBtnEl) {
        backUpData.push({
          key: 'gender',
          value: targetBtnEl.name,
        });
      }
      //birth
      const btnOpenDatePickerEl = document.querySelector('.btn-open-date-picker');
      const birthDataEl = btnOpenDatePickerEl?.firstElementChild;
      if (!btnOpenDatePickerEl?.classList.contains('none-data') && birthDataEl) {
        backUpData.push({
          key: 'birth',
          value: birthDataEl.textContent as string,
        });
      }
      // save
      if (backUpData[0]) {
        setItem(backUpData);
      }
    }
    if (signUpState.progress === 'job') {
      const listOfCheckBoxEl = document.querySelectorAll(
        '.radio-btn-group input',
      ) as NodeListOf<HTMLInputElement>;
      const checkedEl = [...listOfCheckBoxEl].filter(el => el.checked)[0];
      const backUpData: SignUpSessionDataType[] = [
        {
          key: 'job',
          value: checkedEl.name,
        },
      ];
      setItem(backUpData);
    }
  };
  const onClickPrevBtn = () => {
    const conditionToCloseAuthNumberForm = signUpState.progress === 'email' && openAuthNumberForm;
    if (signUpState.progress === 'agreeToTerms') {
      navigate('/login');
    }
    if (conditionToCloseAuthNumberForm) {
      setOpenAuthNumberForm(false);
    }
    if (signUpState.progress !== 'agreeToTerms' && !conditionToCloseAuthNumberForm) {
      // 현재 페이지 작성 내용 저장
      saveData();
      //이전 단계로 이동
      const currentStepIndex = PROGRESS_ARR.indexOf(signUpState.progress);
      setSignUpState((prevState: SignUpStateType) => ({
        ...prevState,
        progress: PROGRESS_ARR[currentStepIndex - 1],
      }));
    }
  };
  return (
    <div id="sign-up__top-bar">
      <button className="btn-prev" onClick={onClickPrevBtn} title="btn-prev" type="button">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="title">간편 가입</div>
    </div>
  );
};
export default SignUpTopBar;
