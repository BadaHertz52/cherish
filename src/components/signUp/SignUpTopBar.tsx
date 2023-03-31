import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction, useContext } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import {
  InputDataType,
  progressArr,
  sessionDataKey,
  SessionDataKeyType,
  SessionDataType,
  SignUpStateType,
} from './signUpTypes';
/**
 *  sessionStorage에 target에 대한 정보가 있을 경우, setState로 target에 대한 상태를 업데이트한다.
 * @param target
 * @param setState
 * @param removeItem; sessionStorage 에서 해당 item을 삭제하는 지 여부
 */
export const getPrevData = (
  target: SessionDataKeyType,
  setState: Dispatch<SetStateAction<InputDataType>>,
  removeItem: boolean,
) => {
  const item = sessionStorage.getItem('signUpBackUpData');
  if (item !== null) {
    const prevData: SessionDataType[] = JSON.parse(item);
    const prevState = prevData.filter(i => i.key === target)[0];
    if (prevState !== undefined) {
      setState({
        value: prevState.value,
        errorMsg: null,
      });
      if (removeItem) {
        sessionStorage.removeItem('signUpBackUpData');
      }
    }
  }
};
const SignUpTopBar = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
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
      if (listOfInputEl[0] !== undefined) {
        const backUpDataArr: SessionDataType[] = [...listOfInputEl].map((el: HTMLInputElement) => ({
          key: el.id.replace('input-', '') as SessionDataKeyType,
          value: el.value,
        }));
        backUpDataArr[0] !== undefined &&
          sessionStorage.setItem('signUpBackUpData', JSON.stringify(backUpDataArr));
      }
    }
    if (signUpState.progress === 'agreeToTerms') {
      // 추후
    }

    if (signUpState.progress === 'job') {
      //추후
    }
  };
  const onClickPrevBtn = () => {
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
  };
  return (
    <div id="sign-up__top-bar">
      {signUpState.progress !== 'agreeToTerms' && (
        <button className="btn-prev" onClick={onClickPrevBtn} title="btn-prev" type="button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}
      <div className="title">간편 가입</div>
    </div>
  );
};
export default SignUpTopBar;
