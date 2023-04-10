import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { SignUpStateType } from './signUpTypes';
import {
  SignUpTopBar,
  ProgressBar,
  SignUpTerms,
  NameAndNickName,
  SignUpEmail,
  SignUpPw,
  GenderAndBirth,
  JobInfo,
} from './components';
import './style.scss';

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
  const [openAuthNumberForm, setOpenAuthNumberForm] = useState<boolean>(false);

  return (
    <div id="sign-up">
      <SignUpContext.Provider
        value={{
          signUpState: signUpState,
          setSignUpState: setSignUpState,
        }}
      >
        <SignUpTopBar
          openAuthNumberForm={openAuthNumberForm}
          setOpenAuthNumberForm={setOpenAuthNumberForm}
        />
        <ProgressBar />
        {/* step: 회원 가입 단계별 component */}
        {signUpState.progress === 'agreeToTerms' && <SignUpTerms />}
        {signUpState.progress === 'nameAndNickName' && <NameAndNickName />}
        {signUpState.progress === 'email' && (
          <SignUpEmail
            openAuthNumberForm={openAuthNumberForm}
            setOpenAuthNumberForm={setOpenAuthNumberForm}
          />
        )}
        {signUpState.progress === 'pw' && <SignUpPw />}
        {signUpState.progress === 'genderAndBirth' && <GenderAndBirth />}
        {signUpState.progress === 'job' && <JobInfo />}
      </SignUpContext.Provider>
    </div>
  );
};

export default React.memo(SignUp);
