import { useContext, useEffect, useState } from 'react';

import { InputForm } from '@/components';
import { SignUpContext } from '@/pages/SignUp';

import {
  initialInputData,
  INPUT_FORM_ID,
  InputDataType,
  InputFormIdType,
  SIGN_UP_SESSION_DATA_KEY,
  SignUpSessionDataKeyType,
  SignUpStateType,
} from '../signUpTypes';

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
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.name as SignUpSessionDataKeyType,
      setName,
      undefined,
      undefined,
      undefined,
    );
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.nickName as SignUpSessionDataKeyType,
      setNickName,
      undefined,
      undefined,
      undefined,
    );
    if (signUpState.name && signUpState.nickname) {
      setName({
        value: signUpState.name,
      });
      setNickName({
        value: signUpState.nickname,
      });
    }
  }, []);
  useEffect(() => {
    if (name.value && !name.errorType && nickName.value && !nickName.errorType) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [name.value, nickName.value]);
  return (
    <div id="nameAndNickName">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <InputForm id={INPUT_FORM_ID.name as InputFormIdType} data={name} setData={setName} />
        <InputForm
          id={INPUT_FORM_ID.nickName as InputFormIdType}
          data={nickName}
          setData={setNickName}
        />
      </StepInner>
    </div>
  );
};

export default NameAndNickName;
