import { Dispatch, SetStateAction, useContext } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SignUpContext } from '@/pages/SignUp';

import {
  BirthStateType,
  GenderStateType,
  GenderType,
  InputDataType,
  progressArr,
  SessionDataKeyType,
  SessionDataType,
  SignUpStateType,
} from '../signUpTypes';
/**
 *  sessionStorage에 target에 대한 정보가 있을 경우, setState로 target에 대한 상태를 업데이트한다.
 * @param target
 * @param setState
 * @param removeItem; sessionStorage 에서 해당 item을 삭제하는 지 여부
 */
export const getPrevData = (
  target: SessionDataKeyType,
  setInputDataState?: Dispatch<SetStateAction<InputDataType>>,
  setGenderState?: Dispatch<SetStateAction<GenderStateType>>,
  setBirthState?: Dispatch<SetStateAction<BirthStateType>>,
) => {
  const item = sessionStorage.getItem('signUpBackUpData');
  if (item) {
    const prevData: SessionDataType[] = JSON.parse(item);
    const prevState = prevData.find(i => i.key === target);
    if (prevState) {
      if (setInputDataState) {
        setInputDataState({
          value: prevState.value,
          errorMsg: null,
        });
      }
      if (setGenderState) {
        setGenderState({
          value: prevState.value as GenderType,
          errorMsg: null,
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
          errorMsg: null,
        });
      }
    }
  }
};
const SignUpTopBar = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const setItem = (item: SessionDataType[]) => {
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
        const backUpDataArr: SessionDataType[] = [...listOfInputEl].map((el: HTMLInputElement) => ({
          key: el.id.replace('input-', '') as SessionDataKeyType,
          value: el.value,
        }));
        backUpDataArr[0] && setItem(backUpDataArr);
      }
    }
    if (signUpState.progress === 'genderAndBirth') {
      const backUpData: SessionDataType[] = [];
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
        '.check-box-group input',
      ) as NodeListOf<HTMLInputElement>;
      const checkedEl = [...listOfCheckBoxEl].filter(el => el.checked)[0];
      const backUpData: SessionDataType[] = [
        {
          key: 'job',
          value: checkedEl.name,
        },
      ];
      setItem(backUpData);
    }
  };
  const onClickPrevBtn = () => {
    if (signUpState.progress !== 'agreeToTerms') {
      // 현재 페이지 작성 내용 저장
      saveData();
      //이전 단계로 이동
      const currentStepIndex = progressArr.indexOf(signUpState.progress);
      setSignUpState((prevState: SignUpStateType) => {
        const newState: SignUpStateType = {
          ...prevState,
          progress: progressArr[currentStepIndex - 1],
        };
        return newState;
      });
    } else {
      // 간편 가입 이전 페이지 이동
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
