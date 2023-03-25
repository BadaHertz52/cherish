import { useContext, useEffect, useState } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import { SignUpStateType } from './signUpTypes';
import StepInner from './StepInner';

const Terms = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  type AgreementState = {
    termsAndCondition: boolean; //이용약관
    personalInformation: boolean; // 개인정보 수집 및 이용
    marketing: boolean; // 마케팅 정보 활용 동의
  };
  const [agreement, setAgreement] = useState<AgreementState>({
    termsAndCondition: false,
    personalInformation: false,
    marketing: false,
  });
  // NextBtn 비활성화 여부
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const onClickNextBtn = () => {
    setSignUpState({
      ...signUpState,
      progress: 'nameAndNickName',
      agreeToTerms: true,
    });
  };
  useEffect(() => {
    if (agreement.termsAndCondition && agreement.personalInformation && agreement.marketing) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [agreement]);
  return (
    <div id="singUpTerms" className="step">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <div>ddd</div>
      </StepInner>
    </div>
  );
};

export default Terms;
