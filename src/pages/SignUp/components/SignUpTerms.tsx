import { useCallback, useContext, useEffect, useState } from 'react';

import { CheckBox, ConfirmModal } from '@/components';
import { ConfirmModalProps } from '@/components/Modals/ConfirmModal';
import { ConfirmModalBtnType } from '@/components/Modals/modalTypes';
import { SignUpContext } from '@/pages/SignUp';
import { TermsOfUse, Marketing, PersonalInformation } from '@/pages/SignUp/components/terms';

import {
  AgreementStateType,
  SIGN_UP_PROGRESS,
  SignUpStateType,
  TERMS_CHECK_BOX_NAME,
  TERMS_CONTENTS_NAME,
  TermsCheckBoxNameType,
  TermsContentsNameType,
} from '../signUpTypes';

import StepInner from './StepInner';

type SignUpTermProps = {
  id: TermsCheckBoxNameType;
  label: string;
  isChecked: boolean;
  handleChange: () => void;
  onClickBtn: (() => void) | null;
};
const SignUpTerm = ({ id, label, isChecked, handleChange, onClickBtn }: SignUpTermProps) => {
  const handleClick = () => {
    if (onClickBtn) onClickBtn();
  };
  return (
    <div className="term">
      <CheckBox
        id={id}
        name={id}
        label={label}
        isChecked={() => isChecked}
        onChange={handleChange}
      />
      <div className="term__contents">
        <button className=" btn-open-modal label" onClick={handleClick}>
          {label}
        </button>
        {onClickBtn && (
          <button className="btn-open-modal" onClick={handleClick} type="button">
            내용보기
          </button>
        )}
      </div>
    </div>
  );
};
const SignUpTerms = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [agreement, setAgreement] = useState<AgreementStateType>(signUpState.agreeToTerms);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTargetTerms, setOpenTargetTerms] = useState<TermsContentsNameType>(
    TERMS_CONTENTS_NAME.termsOfUse,
  );
  // NextBtn 비활성화 여부
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const NO_BTN_VALUE: ConfirmModalBtnType = {
    //btn 의 text node
    text: '닫기',
  };
  const MODAL_TERMS_OF_USE: Omit<ConfirmModalProps, 'closeModal'> = {
    title: '이용약관(필수)',
    children: <TermsOfUse />,
    yesBtn: makeYestBtnValue(TERMS_CONTENTS_NAME.termsOfUse),
    noBtn: NO_BTN_VALUE,
  };
  const MODAL_PERSONAL_INFORMATION: Omit<ConfirmModalProps, 'closeModal'> = {
    title: '개인정보 수집 및 이용(필수)',
    children: <PersonalInformation />,
    yesBtn: makeYestBtnValue(TERMS_CONTENTS_NAME.personalInformation),
    noBtn: NO_BTN_VALUE,
  };
  const MODAL_MARKETING: Omit<ConfirmModalProps, 'closeModal'> = {
    title: '마케팅 정보 활용 동의(선택)',
    children: <Marketing />,
    yesBtn: makeYestBtnValue(TERMS_CONTENTS_NAME.marketing),
    noBtn: NO_BTN_VALUE,
  };
  const TERMS = {
    termsOfUse: MODAL_TERMS_OF_USE,
    personalInformation: MODAL_PERSONAL_INFORMATION,
    marketing: MODAL_MARKETING,
  };
  function makeYestBtnValue(name: TermsContentsNameType): ConfirmModalBtnType {
    return {
      //btn 의 text node
      text: '동의하기',
      //btn 클릭 시 이동/창 닫기 외의 필요한 기능
      otherFn: () => onClickYesBtn(name),
    };
  }

  const onClickNextBtn = () => {
    setSignUpState((prevState: SignUpStateType) => {
      const newState: SignUpStateType = {
        ...prevState,
        progress: SIGN_UP_PROGRESS.nameAndNickName,
        agreeToTerms: agreement,
      };
      return newState;
    });
  };
  const handleChecked = (name: TermsCheckBoxNameType | 'whole-agree') => {
    let checked = true;
    if (name == 'whole-agree') {
      checked =
        agreement.ageCondition &&
        agreement.marketing &&
        agreement.personalInformation &&
        agreement.termsOfUse;
    } else {
      checked = agreement[name];
    }
    return checked;
  };
  const handleWholeAgree = () => {
    const allAgree =
      agreement.termsOfUse &&
      agreement.personalInformation &&
      agreement.ageCondition &&
      agreement.marketing;
    if (allAgree) {
      setAgreement({
        termsOfUse: false,
        personalInformation: false,
        ageCondition: false,
        marketing: false,
      });
    } else {
      setAgreement({
        termsOfUse: true,
        personalInformation: true,
        ageCondition: true,
        marketing: true,
      });
    }
  };
  function changeAgreement(name: TermsCheckBoxNameType, agree: boolean) {
    switch (name) {
      case TERMS_CHECK_BOX_NAME.ageCondition:
        setAgreement((prev: AgreementStateType) => ({
          ...prev,
          ageCondition: agree,
        }));
        break;
      case TERMS_CHECK_BOX_NAME.termsOfUse:
        setAgreement((prev: AgreementStateType) => ({
          ...prev,
          termsOfUse: agree,
        }));
        break;
      case TERMS_CHECK_BOX_NAME.personalInformation:
        setAgreement((prev: AgreementStateType) => ({
          ...prev,
          personalInformation: !prev.personalInformation,
        }));
        break;
      case TERMS_CHECK_BOX_NAME.marketing:
        setAgreement((prev: AgreementStateType) => ({
          ...prev,
          marketing: agree,
        }));
        break;

      default:
        break;
    }
  }
  function onClickYesBtn(name: TermsCheckBoxNameType) {
    changeAgreement(name, true);
  }
  const onClickToShowTerm = (name: TermsContentsNameType) => {
    setOpenModal(true);
    setOpenTargetTerms(TERMS_CONTENTS_NAME[name]);
  };

  //agreement 의 상태 변화에 따라 disableBtn 상태 변경
  const changeDisableBtn = useCallback(() => {
    if (agreement.termsOfUse && agreement.personalInformation && agreement.ageCondition) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [agreement]);

  useEffect(() => {
    changeDisableBtn();
  }, [agreement]);
  return (
    <div id="sign-up__terms" className="step">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <div className="terms__top">
          <div className="terms__header">
            <h2>환영해요!</h2>
            <h3>아래 약관에 동의하시면</h3>
            <h3>정성스러운 선물을 추천해드려요</h3>
          </div>
          <CheckBox
            id="whole-agree"
            name=""
            label="전체 동의"
            isChecked={() => handleChecked('whole-agree')}
            onChange={handleWholeAgree}
          />
        </div>
        <section className="terms-group">
          <SignUpTerm
            id={TERMS_CHECK_BOX_NAME.termsOfUse}
            label="이용약관(필수)"
            isChecked={agreement.termsOfUse}
            handleChange={() =>
              changeAgreement(TERMS_CHECK_BOX_NAME.termsOfUse, !agreement.termsOfUse)
            }
            onClickBtn={() => onClickToShowTerm(TERMS_CONTENTS_NAME.termsOfUse)}
          />
          <SignUpTerm
            id={TERMS_CHECK_BOX_NAME.personalInformation}
            label="개인정보 수집 및 이용(필수)"
            isChecked={agreement.personalInformation}
            handleChange={() =>
              changeAgreement(
                TERMS_CHECK_BOX_NAME.personalInformation,
                !agreement.personalInformation,
              )
            }
            onClickBtn={() => onClickToShowTerm(TERMS_CONTENTS_NAME.personalInformation)}
          />
          <SignUpTerm
            id={TERMS_CHECK_BOX_NAME.ageCondition}
            label="14세 이상 이용 동의(필수)"
            isChecked={agreement.ageCondition}
            handleChange={() =>
              changeAgreement(TERMS_CHECK_BOX_NAME.ageCondition, !agreement.ageCondition)
            }
            onClickBtn={null}
          />
          <SignUpTerm
            id={TERMS_CHECK_BOX_NAME.marketing}
            label="마케팅 정보 활용 동의(선택)"
            isChecked={agreement.marketing}
            handleChange={() =>
              changeAgreement(TERMS_CHECK_BOX_NAME.marketing, !agreement.marketing)
            }
            onClickBtn={() => onClickToShowTerm(TERMS_CONTENTS_NAME.marketing)}
          />
        </section>
      </StepInner>
      {openModal && (
        <ConfirmModal
          title={TERMS[openTargetTerms].title}
          yesBtn={TERMS[openTargetTerms].yesBtn}
          noBtn={TERMS[openTargetTerms].noBtn}
          closeModal={() => setOpenModal(false)}
        >
          {TERMS[openTargetTerms].children}
        </ConfirmModal>
      )}
    </div>
  );
};

export default SignUpTerms;
