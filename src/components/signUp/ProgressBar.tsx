import { useContext } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import { SignUpProgressType } from './signUpTypes';

const ProgressBar = () => {
  const { signUpState } = useContext(SignUpContext);
  const progressArr: SignUpProgressType[] = [
    'agreeToTerms',
    'nameAndNickName',
    'email',
    'pw',
    'genderAndBirth',
    'job',
  ];
  // 현재 진행 중인 회원가입의 단계
  const currentStep = progressArr.indexOf(signUpState.progress) + 1;
  return <div id="progressBar"></div>;
};

export default ProgressBar;
