import { createContext, useState } from 'react';
import { SignUpStateType, SignUpProgressType } from '../components/signUp/signUpTypes';
import SignUpTopBar from '../components/signUp/SingUpTopBar';
import ProgressBar from '../components/signUp/ProgressBar';
import Terms from '../components/signUp/Terms';
const initialSingUpState: SignUpStateType = {
  progress: 'agreeToTerms',
  agreeToTerms: false,
  name: null,
  nickname: null,
  email: null,
  pw: null,
  confirmPw: null,
  gender: null,
  birth: null,
  job: null,
};
export const SignUpContext = createContext({
  signUpState: initialSingUpState,
  setSignUpState: (state: SignUpStateType) => {},
});

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
        {/* step: 회원 가입 단계별 component */}
        {signUpState.progress === 'agreeToTerms' && <Terms />}
        <ProgressBar />
      </SignUpContext.Provider>
    </div>
  );
};

export default SignUp;
