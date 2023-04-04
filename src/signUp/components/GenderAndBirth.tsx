import { MouseEvent, useContext, useEffect, useState } from 'react';
import StepInner from './StepInner';
import {
  BirthStateType,
  ERROR_MSG,
  GenderStateType,
  GenderType,
  SignUpStateType,
} from './signUpTypes';
import { SignUpContext } from '..';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPrevData } from './SignUpTopBar';
import DatePicker from './DatePicker';

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
    if (gender.value !== null && birth.value !== null) {
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
    getPrevData('gender', null, setGender, null);
    getPrevData('birth', null, null, setBirth);
    if (signUpState.gender) {
      setGender({
        value: signUpState.gender,
        errorMsg: null,
      });
    }
    // birth
  }, []);
  useEffect(() => {
    if (
      gender.value !== null &&
      gender.errorMsg === null &&
      birth.value !== null &&
      birth.errorMsg == null
    ) {
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
              className={`btn-gender ${gender.value === 'female' ? 'on' : ''}`}
              name="female"
              type="button"
              onClick={event => onClickGenderBtn(event)}
            >
              여성
            </button>
            <button
              className={`btn-gender ${gender.value === 'male' ? 'on' : ''}`}
              name="male"
              type="button"
              onClick={event => onClickGenderBtn(event)}
            >
              남성
            </button>
          </div>
          <div className="msg">{gender.value === null && ERROR_MSG.required}</div>
        </section>
        <section className="birth">
          <h4>생년월일</h4>
          <button
            className={`btn-open-date-picker ${birth.value === null ? 'none-data' : ''}`}
            type="button"
            onClick={onClickBirthBtn}
          >
            <div className="birth__data">
              {birth.value === null
                ? '생년월일'
                : `${birth.value.year}/${birth.value.month}/${birth.value.date}`}
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
