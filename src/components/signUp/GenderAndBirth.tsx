import { MouseEvent, useContext, useState } from 'react';
import StepInner from './StepInner';
import { ERROR_MSG, InputDataType, initialInputData } from './signUpTypes';
import { SignUpContext } from '../../pages/SignUp';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePickerContainer from './DatePickerContainer';

const GenderAndBirth = () => {
  const { setSignUpState } = useContext(SignUpContext);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [birth, setBirth] = useState<InputDataType>({
    ...initialInputData,
    errorMsg: ERROR_MSG.required,
  });
  const [gender, setGender] = useState<InputDataType>({
    ...initialInputData,
    errorMsg: ERROR_MSG.required,
  });
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(true);
  const onClickNextBtn = () => {};
  const onClickGenderBtn = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const name = target.name;
    setGender({
      value: name,
      errorMsg: null,
    });
  };
  const onClickBirthBtn = () => {
    setOpenDatePicker((prev: boolean) => !prev);
  };
  return (
    <div id="gender-and-birth">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <h2>선물 큐레이션을 위한 정보를 입력하세요.</h2>
        <section className="gender">
          <h3>성별</h3>
          <div className="btn-group">
            <button
              className="btn-female"
              name="female"
              type="button"
              onClick={event => onClickGenderBtn(event)}
            >
              여성
            </button>
            <button
              className="btn-male"
              name="male"
              type="button"
              onClick={event => onClickGenderBtn(event)}
            >
              남성
            </button>
          </div>
          <div className="msg">{gender.value === '' && ERROR_MSG.required}</div>
        </section>
        <section className="birth">
          <h3>생년월일</h3>
          <button
            className={`btn-open-modal-birth ${birth.value === '' ? 'none-data' : ''}`}
            type="button"
            onClick={onClickBirthBtn}
          >
            <div className="birth__data">{birth.value === '' ? '생년월일' : birth.value}</div>
            <FontAwesomeIcon icon={openDatePicker ? faSortUp : faSortDown} />
          </button>
          {openDatePicker && <DatePickerContainer />}
          <div className="msg">{birth.value === '' && ERROR_MSG.required}</div>
        </section>
      </StepInner>
    </div>
  );
};
export default GenderAndBirth;
