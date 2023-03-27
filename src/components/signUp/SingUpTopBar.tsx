import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import {
  progressArr,
  sessionDataKey,
  SessionDataKeyType,
  SessionDataType,
  SignUpStateType,
} from './signUpTypes';
import '../../assets/signUp/signUpTopBar.scss';
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
      const listOfInputEl = document.getElementsByTagName('input');
      const backUpDataArr: SessionDataType[] = [...listOfInputEl].map((el: HTMLInputElement) => ({
        key: sessionDataKey[`${el.name as SessionDataKeyType}`] as SessionDataKeyType,
        value: el.value,
      }));
      sessionStorage.setItem('signUpBackUpData', JSON.stringify(backUpDataArr));
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
    <div id="signUpTopBar">
      <button className="btn-prev" onClick={onClickPrevBtn} title="btn-prev" type="button">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="title">간편 가입</div>
    </div>
  );
};
export default SignUpTopBar;
