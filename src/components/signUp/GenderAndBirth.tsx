import { MouseEvent, useContext, useState } from 'react';
import StepInner from './StepInner';
import { ERROR_MSG, InputDataType, initialInputData } from './signUpTypes';
import { SignUpContext } from '../../pages/SignUp';

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
  const [openBirthModal, setOpenBirthModal] = useState<boolean>(false);
  const onClickNextBtn = () => {};
  const onClickGenderBtn = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const name = target.name;
    setGender({
      value: name,
      errorMsg: null,
    });
  };
  const onClickBirthBtn = () => {};
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
        </section>
        <section className="birth">
          <h3>생년월일</h3>
          <button
            className={`btn-open-modal-birth ${birth.value === '' ? 'none-data' : ''}`}
            type="button"
            onClick={onClickBirthBtn}
          >
            {birth.value === '' ? '생년월일' : birth.value}
          </button>
        </section>
      </StepInner>
    </div>
  );
};
export default GenderAndBirth;
