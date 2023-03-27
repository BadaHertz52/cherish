import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { SignUpStateType } from '../components/signUp/signUpTypes';
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
    <form action="" method="post" id="signUp">
      <SignUpContext.Provider
        value={{
          signUpState: signUpState,
          setSignUpState: setSignUpState,
        }}
      >
        <SignUpTopBar />
        {signUpState.progress !== 'agreeToTerms' && <ProgressBar />}
        {/* step: 회원 가입 단계별 component */}
        {signUpState.progress === 'agreeToTerms' && <Terms />}
      </SignUpContext.Provider>
    </form>
  );
};

export default SignUp;
