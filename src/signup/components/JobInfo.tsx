import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import StepInner from './StepInner';
import CheckBox from '../../checkbox';
import {
  ERROR_MSG,
  InputDataType,
  SignUpStateType,
  initialInputData,
  jobCheckBoxArr,
} from './signUpTypes';
import { getPrevData } from './SignUpTopBar';
import { JobType } from './signUpTypes';
import { SignUpContext } from '..';

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
    getPrevData('job', setJob, null, null);
  }, []);
  useEffect(() => {
    if (job.value !== '') {
      setDisAbleBtn(false);
      const targetCheckBoxEl = document.querySelector(
        `#job-info-${job.value}`,
      ) as HTMLInputElement | null;
      if (targetCheckBoxEl !== null) {
        targetCheckBoxEl.checked = true;
      }
    } else {
      setDisAbleBtn(true);
    }
  }, [job]);
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
