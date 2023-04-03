import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import StepInner from './StepInner';
import CheckBox from '../CheckBox';
import {
  ERROR_MSG,
  InputDataType,
  SignUpStateType,
  initialInputData,
  jobCheckBoxArr,
} from './signUpTypes';
import { getPrevInputData } from './SignUpTopBar';
import { SignUpContext } from '../../pages/SignUp';
import { JobType } from './signUpTypes';

const JobInfo = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisAbleBtn] = useState<boolean>(true);
  const [job, setJob] = useState<InputDataType>(initialInputData);
  const checkedCheckBoxEl = document.querySelectorAll(
    '.check-box input',
  ) as NodeListOf<HTMLInputElement>;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    checkedCheckBoxEl.forEach(el => {
      if (el.id === target.id) {
        el.checked = true;

        setJob({
          value: el.name,
          errorMsg: null,
        });
      } else {
        if (el.checked === true) el.checked = false;
      }
    });
  };
  useEffect(() => {
    getPrevInputData('job', setJob, true);
    if (signUpState.job !== null) {
      setJob({ value: signUpState.job, errorMsg: null });
    }
  }, []);
  useEffect(() => {
    if (job.value !== '') {
      setDisAbleBtn(false);
    } else {
      setDisAbleBtn(true);
    }
  }, [job]);
  const onClickNextBtn = () => {
    const newState: SignUpStateType = {
      ...signUpState,
      job: job.value as JobType,
    };
    setSignUpState(newState);
    // 서버에 간편가입
    // 간편 가입 성공 시 1.1 로 이동
  };
  return (
    <div id="job-info">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <h3>직업</h3>
        <section className="check-box-group">
          {jobCheckBoxArr.map(i => (
            <CheckBox id={`job-info-${i.name}`} name={i.name} label={i.label} onChange={onChange} />
          ))}
        </section>
        <div className="msg">{job.value === '' && ERROR_MSG.required}</div>
      </StepInner>
    </div>
  );
};

export default React.memo(JobInfo);
