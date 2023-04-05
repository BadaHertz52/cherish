import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { SignUpStateType } from './components/signUpTypes';
import SignUpTopBar from './components/SignUpTopBar';
import ProgressBar from './components/ProgressBar';
import SignUpTerms from './components/SignUpTerms';
import './style.scss';
import NameAndNickName from './components/NameAndNickName';
import Email from './components/Email';
import SignUpPw from './components/SignUpPw';
import GenderAndBirth from './components/GenderAndBirth';
import JobInfo from './components/JobInfo';
export const initialSignUpState: SignUpStateType = {
  progress: 'agreeToTerms',
  agreeToTerms: {
    termsOfUse: false,
    ageCondition: false,
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
        {signUpState.progress === 'pw' && <SignUpPw />}
        {signUpState.progress === 'genderAndBirth' && <GenderAndBirth />}
        {signUpState.progress === 'job' && <JobInfo />}
      </SignUpContext.Provider>
    </div>
  );
};

export default React.memo(SignUp);
