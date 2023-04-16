import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

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
import { SIGN_UP_PROGRESS, SignUpStateType } from './signUpTypes';

export const initialSignUpState: SignUpStateType = {
  progress: SIGN_UP_PROGRESS.agreeToTerms,
  agreeToTerms: {
    termsOfUse: false,
    ageCondition: false,
    personalInformation: false,
    marketing: false,
  },
  name: undefined,
  nickname: undefined,
  email: undefined,
  pw: undefined,
  gender: undefined,
  birth: undefined,
  job: undefined,
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
