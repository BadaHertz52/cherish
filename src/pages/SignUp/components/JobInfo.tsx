import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { onLogIn } from '@/api/auth/logIn';
import { onSignUp } from '@/api/auth/signUp';
import { SignUpAPIParams } from '@/api/auth/types';
import { RadioBtn } from '@/components';
import { SignUpContext } from '@/pages/SignUp';

import {
  ERROR_MSG,
  SignUpStateType,
  JOB_ARR,
  JobType,
  SIGN_UP_SESSION_DATA_KEY,
  SignUpSessionDataKeyType,
  JobStateType,
} from '../signUpTypes';

import { getPrevData } from './SignUpTopBar';
import StepInner from './StepInner';

const JobInfo = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [job, setJob] = useState<JobStateType>({
    value: undefined,
    errorType: 'required',
  });
  const handleChange = (name: JobType) => {
    setJob({
      value: name,
      errorType: undefined,
    });
    setDisableBtn(false);
  };
  const changeSignUpStateToParams = (state: SignUpStateType) => {
    if (state.birth && state.email && state.job && state.name && state.nickname && state.pw) {
      const { year, month, date } = state.birth;
      const params: SignUpAPIParams = {
        name: state.name,
        nickname: state.nickname,
        email: state.email,
        password: state.pw,
        infoCheck: state.agreeToTerms.marketing,
        gender: state.gender ? (state.gender === 'female' ? 'FEMALE' : 'MALE') : 'NONE',
        birth: new Date(`${year}-${month}-${date}`),
        job: state.job,
      };
      return params;
    }
  };
  const onClickNextBtn = async () => {
    const newState: SignUpStateType = {
      ...signUpState,
      job: job.value as JobType,
    };
    setSignUpState(newState);
    //간편가입 api
    const params = changeSignUpStateToParams(newState);
    if (params) {
      const result = await onSignUp(params);
      if (result.success && newState.email && newState.pw) {
        //간편 가입 성공 시 자동 로그인
        const logInResult = await onLogIn({ email: newState.email, password: newState.pw });
        if (logInResult.success) {
          sessionStorage.setItem('new member', 'true');
        }
      }
    }
    // 간편 가입 성공 시 1.1 로 이동
  };
  useEffect(() => {
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.job as SignUpSessionDataKeyType,
      undefined,
      undefined,
      undefined,
      setJob,
    );
  }, []);
  return (
    <div id="job-info">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <h3>직업</h3>
        <fieldset className="radio-btn-group">
          {JOB_ARR.map(i => (
            <RadioBtn
              key={i.name}
              id={`job-info-${i.name}`}
              name="job"
              value={i.name}
              label={i.name}
              onChange={() => handleChange(i.name)}
            />
          ))}
        </fieldset>
        <div className="msg">{job.errorType && ERROR_MSG[job.errorType]}</div>
      </StepInner>
    </div>
  );
};

export default React.memo(JobInfo);
