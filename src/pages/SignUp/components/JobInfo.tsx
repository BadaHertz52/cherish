import React, { useContext, useEffect, useState } from 'react';

import { RadioBtn } from '@/components';
import { SignUpContext } from '@/pages/SignUp';

import {
  ERROR_MSG,
  InputDataType,
  SignUpStateType,
  initialInputData,
  jobCheckBoxArr,
  JobType,
  SIGN_UP_SESSION_DATA_KEY,
  SignUpSessionDataKeyType,
} from '../signUpTypes';

import { getPrevData } from './SignUpTopBar';
import StepInner from './StepInner';

const JobInfo = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [job, setJob] = useState<InputDataType>(initialInputData);

  const handleChange = (name: JobType) => {
    setJob({
      value: name,
      errorMsg: null,
    });
    setDisableBtn(false);
  };
  const onClickNextBtn = () => {
    const newState: SignUpStateType = {
      ...signUpState,
      job: job.value as JobType,
    };
    setSignUpState(newState);
    // 서버에 간편가입
    // 간편 가입 성공 시 1.1 로 이동
  };
  useEffect(() => {
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.job as SignUpSessionDataKeyType,
      setJob,
      undefined,
      undefined,
    );
  }, []);
  return (
    <div id="job-info">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <h3>직업</h3>
        <section className="radio-btn-group">
          {jobCheckBoxArr.map(i => (
            <RadioBtn
              key={i.name}
              id={`job-info-${i.name}`}
              name={i.name}
              label={i.label}
              isChecked={() => job.value === i.name}
              onChange={() => handleChange(i.name)}
            />
          ))}
        </section>
        <div className="msg">{job.value === '' && ERROR_MSG.required}</div>
      </StepInner>
    </div>
  );
};

export default React.memo(JobInfo);
