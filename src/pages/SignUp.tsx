import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { SignUpStateType } from '../components/signUp/signUpTypes';
import SignUpTopBar from '../components/signUp/SignUpTopBar';
import ProgressBar from '../components/signUp/ProgressBar';
import SignUpTerms from '../components/signUp/SignUpTerms';
import '../assets/signUp/signUp.scss';
import NameAndNickName from '../components/signUp/NameAndNickName';
import Email from '../components/signUp/Email';
import Pw from '../components/signUp/Pw';
import GenderAndBirth from '../components/signUp/GenderAndBirth';
import JobInfo from '../components/signUp/JobInfo';
export const initialSignUpState: SignUpStateType = {
  progress: 'genderAndBirth',
  agreeToTerms: {
    termsAndCondition: false,
    personalInformation: false,
    marketing: false,
  },
  name: null,
  nickname: null,
  email: null,
  pw: null,
  gender: null,
  birth: null,
  job: null,
};
type SignUpContextType = {
  signUpState: SignUpStateType;
  setSignUpState: Dispatch<SetStateAction<SignUpStateType>>;
};
const context: SignUpContextType = {
  signUpState: initialSignUpState,
  setSignUpState: () => {},
};
export const SignUpContext = createContext<SignUpContextType>(context);

const SignUp = () => {
  const [signUpState, setSignUpState] = useState<SignUpStateType>(initialSignUpState);
  return (
    <div id="sign-up">
      <SignUpContext.Provider
        value={{
          signUpState: signUpState,
          setSignUpState: setSignUpState,
        }}
      >
        <SignUpTopBar />
        <ProgressBar />
        {/* step: 회원 가입 단계별 component */}
        {signUpState.progress === 'agreeToTerms' && <SignUpTerms />}
        {signUpState.progress === 'nameAndNickName' && <NameAndNickName />}
        {signUpState.progress === 'email' && <Email />}
        {signUpState.progress === 'pw' && <Pw />}
        {signUpState.progress === 'genderAndBirth' && <GenderAndBirth />}
        {signUpState.progress === 'job' && <JobInfo />}
      </SignUpContext.Provider>
    </div>
  );
};

export default React.memo(SignUp);
