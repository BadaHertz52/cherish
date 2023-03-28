import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { SignUpStateType } from '../components/signUp/signUpTypes';
import SignUpTopBar from '../components/signUp/SignUpTopBar';
import ProgressBar from '../components/signUp/ProgressBar';
import SignUpTerms from '../components/signUp/SignUpTerms';
import '../assets/signUp/signUp.scss';
import NameAndNickName from '../components/signUp/NameAndNickName';
import Email from '../components/signUp/Email';
const initialSingUpState: SignUpStateType = {
  progress: 'email',
  agreeToTerms: {
    termsAndCondition: false,
    personalInformation: false,
    marketing: false,
  },
  name: null,
  nickname: null,
  email: null,
  pw: null,
  confirmPw: null,
  gender: null,
  birth: null,
  job: null,
};
type SignUpContextType = {
  signUpState: SignUpStateType;
  setSignUpState: Dispatch<SetStateAction<SignUpStateType>>;
};
const context: SignUpContextType = {
  signUpState: initialSingUpState,
  setSignUpState: () => {},
};
export const SignUpContext = createContext<SignUpContextType>(context);

const SignUp = () => {
  const [signUpState, setSignUpState] = useState<SignUpStateType>(initialSingUpState);
  return (
    <div id="signUp">
      <SignUpContext.Provider
        value={{
          signUpState: signUpState,
          setSignUpState: setSignUpState,
        }}
      >
        <SignUpTopBar />
        {signUpState.progress !== 'agreeToTerms' && <ProgressBar />}
        {/* step: 회원 가입 단계별 component */}
        {signUpState.progress === 'agreeToTerms' && <SignUpTerms />}
        {signUpState.progress === 'nameAndNickName' && <NameAndNickName />}
        {signUpState.progress === 'email' && <Email />}
      </SignUpContext.Provider>
    </div>
  );
};

export default React.memo(SignUp);
