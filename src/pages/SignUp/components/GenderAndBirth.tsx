import { MouseEvent, useContext, useEffect, useState } from 'react';

import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    value: null,
    errorMsg: ERROR_MSG.required,
  });

  const [gender, setGender] = useState<GenderStateType>({
    value: null,
    errorMsg: ERROR_MSG.required,
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
      errorMsg: null,
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
    );
    getPrevData(
      SIGN_UP_SESSION_DATA_KEY.birth as SignUpSessionDataKeyType,
      undefined,
      undefined,
      setBirth,
    );
    if (signUpState.gender) {
      setGender({
        value: signUpState.gender,
        errorMsg: null,
      });
    }
    if (signUpState.birth) {
      setBirth({
        value: signUpState.birth,
        errorMsg: null,
      });
    }
  }, []);
  useEffect(() => {
    if (gender.value && !gender.errorMsg && birth.value && !birth.errorMsg) {
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
          <div className="msg">{!gender.value && ERROR_MSG.required}</div>
        </section>
        <section className="birth">
          <h4>생년월일</h4>
          <button
            className={`btn-open-date-picker ${!birth.value ? 'none-data' : ''}`}
            type="button"
            onClick={onClickBirthBtn}
          >
            <div className="birth__data">
              {!birth.value ? '' : `${birth.value.year}. ${birth.value.month}. ${birth.value.date}`}
            </div>
            <FontAwesomeIcon icon={openDatePicker ? faSortUp : faSortDown} />
          </button>
          {openDatePicker && <DatePicker birth={birth} setBirth={setBirth} />}
          <div className="msg">{birth.value === null && ERROR_MSG.required}</div>
        </section>
      </StepInner>
    </div>
  );
};
export default GenderAndBirth;
