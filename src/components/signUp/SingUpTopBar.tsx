import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import { progressArr, SignUpStateType } from './signUpTypes';
import '../../assets/signUp/signUpTopBar.scss';
const SignUpTopBar = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const saveData = () => {
    if (signUpState.progress !== 'genderAndBirth' && signUpState.progress !== 'job') {
      const listOfInputEl = document.getElementsByTagName('input');
      const dataArr = [...listOfInputEl].map((el: HTMLInputElement) => ({
        id: el.id,
        value: el.value,
      }));
    }
  };
  const onClickPrevBtn = () => {
    // 현재 작성한 내용 저장 여부는 기획팀과 의논해봐야 함
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
