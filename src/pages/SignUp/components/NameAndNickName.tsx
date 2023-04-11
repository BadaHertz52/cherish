import { useContext, useEffect, useState } from 'react';

import { InputForm } from '@/components';
import { SignUpContext } from '@/pages/SignUp';

import { initialInputData, InputDataType, SignUpStateType } from '../signUpTypes';

import { getPrevData } from './SignUpTopBar';
import StepInner from './StepInner';

const NameAndNickName = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [name, setName] = useState<InputDataType>(initialInputData);
  const [nickName, setNickName] = useState<InputDataType>(initialInputData);
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => ({
      ...prev,
      progress: 'email',
      name: name.value,
      nickname: nickName.value,
    }));
  };
  useEffect(() => {
    // sessionStorage
    getPrevData('name', setName, undefined, undefined);
    getPrevData('nickName', setNickName, undefined, undefined);
    if (signUpState.name && signUpState.nickname) {
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
    if (name.value && !name.errorMsg && nickName.value && !nickName.errorMsg) {
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
