import { MouseEvent, useContext, useEffect, useState } from 'react';

import DownArrow from '@/assets/svgs/down-arrow.svg';
import UpArrow from '@/assets/svgs/up-arrow.svg';
import { SignUpContext } from '@/pages/SignUp';

import {
  BirthStateType,
  ERROR_MSG,
  GENDER_TYPE,
  GenderStateType,
  GenderType,
  SIGN_UP_SESSION_DATA_KEY,
  SignUpSessionDataKeyType,
  SignUpStateType,
} from '../signUpTypes';

import DatePicker from './DatePicker';
import { getPrevData } from './SignUpTopBar';
import StepInner from './StepInner';

const GenderAndBirth = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [birth, setBirth] = useState<BirthStateType>({
    value: undefined,
    errorType: 'required',
  });

  const [gender, setGender] = useState<GenderStateType>({
    value: undefined,
    errorType: 'required',
  });
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const onClickNextBtn = () => {
    if (gender.value && birth.value) {
      setSignUpState((prev: SignUpStateType) => {
        const newState: SignUpStateType = {
          ...prev,
          progress: 'job',
          gender: gender.value,
          birth: birth.value,
        };
        return newState;
      });
    }
  };
  const onClickGenderBtn = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const name = target.name as GenderType;
    setGender({
      value: name,
    });
  };
  const onClickBirthBtn = () => {
    setOpenDatePicker((prev: boolean) => !prev);
  };
  useEffect(() => {
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.gender as SignUpSessionDataKeyType,
      undefined,
      setGender,
      undefined,
      undefined,
    );
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.birth as SignUpSessionDataKeyType,
      undefined,
      undefined,
      setBirth,
      undefined,
    );
    if (signUpState.gender) {
      setGender({
        value: signUpState.gender,
      });
    }
    if (signUpState.birth) {
      setBirth({
        value: signUpState.birth,
      });
    }
  }, []);
  useEffect(() => {
    if (gender.value && !gender.errorType && birth.value && !birth.errorType) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [gender, birth]);
  return (
    <div id="gender-and-birth">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <section className="gender">
          <h4>성별</h4>
          <div className="btn-group">
            <button
              className={`btn-gender ${gender.value === GENDER_TYPE.female ? 'on' : ''}`}
              name={GENDER_TYPE.female}
              type="button"
              onClick={event => onClickGenderBtn(event)}
            >
              여성
            </button>
            <button
              className={`btn-gender ${gender.value === GENDER_TYPE.male ? 'on' : ''}`}
              name={GENDER_TYPE.male}
              type="button"
              onClick={event => onClickGenderBtn(event)}
            >
              남성
            </button>
          </div>
          <div className="msg">
            {!gender.value && gender.errorType && ERROR_MSG[gender.errorType]}
          </div>
        </section>
        <section className="birth">
          <h4>생년월일</h4>
          <button
            className={`btn-open-date-picker ${!birth.value ? 'none-data' : ''} ${
              openDatePicker ? 'open' : ''
            }`}
            type="button"
            onClick={onClickBirthBtn}
          >
            <div className="birth__data">
              {!birth.value ? '' : `${birth.value.year}. ${birth.value.month}. ${birth.value.date}`}
            </div>
            <div className="btn-dropdown">{openDatePicker ? <UpArrow /> : <DownArrow />}</div>
          </button>
          {openDatePicker && <DatePicker birth={birth} setBirth={setBirth} />}
          <div className="msg">{birth.errorType && ERROR_MSG[birth.errorType]}</div>
        </section>
      </StepInner>
    </div>
  );
};
export default GenderAndBirth;
