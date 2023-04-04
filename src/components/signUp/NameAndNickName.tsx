import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import InputForm from './InputForm';
import { getPrevData } from './SignUpTopBar';
import { initialInputData, InputDataType, SessionDataType, SignUpStateType } from './signUpTypes';
import StepInner from './StepInner';

const NameAndNickName = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [name, setName] = useState<InputDataType>(initialInputData);
  const [nickName, setNickName] = useState<InputDataType>(initialInputData);
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => {
      const newState: SignUpStateType = {
        ...prev,
        progress: 'email',
        name: name.value,
        nickname: nickName.value,
      };
      return newState;
    });
  };
  useEffect(() => {
    // sessionStorage
    getPrevData('name', setName, null, null);
    getPrevData('nickName', setNickName, null, null);
    if (signUpState.name !== null && signUpState.nickname !== null) {
      setName({
        value: signUpState.name,
        errorMsg: null,
      });
      setNickName({
        value: signUpState.nickname,
        errorMsg: null,
      });
    }
  }, []);
  useEffect(() => {
    if (
      name.value !== '' &&
      name.errorMsg == null &&
      nickName.value !== '' &&
      nickName.errorMsg == null
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [name.value, nickName.value]);
  return (
    <div id="nameAndNickName">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <InputForm id="name" data={name} setData={setName} />
        <InputForm id="nickName" data={nickName} setData={setNickName} />
      </StepInner>
    </div>
  );
};

export default NameAndNickName;
