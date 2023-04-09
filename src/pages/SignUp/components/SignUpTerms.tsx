import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { SignUpContext } from '@/pages/SignUp';
import { CheckBox, ConfirmModal } from '@/components';
import {
  AgreementStateType,
  SignUpStateType,
  TermsCheckBoxNameType,
  TermsContentsNameType,
} from '../signUpTypes';
import StepInner from './StepInner';
import { ConfirmModalProps } from '@/components/Modals/ConfirmModal';
import { ConfirmModalBtnType } from '@/components/Modals/modalTypes';
import { TermsOfUse, Marketing, PersonalInformation } from '@/pages/SignUp/components/terms';

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
  const [openTargetTerms, setOpenTargetTerms] = useState<TermsContentsNameType>('termsOfUse');
  // NextBtn 비활성화 여부
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const WHOLE_AGREEMENT_CHECK_BOX_EL = document.querySelector(
    `#whole-agree`,
  ) as HTMLInputElement | null;
  const listOfTermsCheckBoxEl = document.querySelectorAll(
    '.terms-group input',
  ) as NodeListOf<HTMLInputElement>;
  const NO_BTN_VALUE: ConfirmModalBtnType = {
    //btn 의 text node
    text: '닫기',
    //btn 클릭 시 이동해야 할 페이지의 경로
    path: null,
    //btn 클릭 시 이동/창 닫기 외의 필요한 기능
    otherFn: null,
  };
  const MODAL_TERMS_OF_USE: Omit<ConfirmModalProps, 'closeModal'> = {
    title: '이용약관(필수)',
    children: <TermsOfUse />,
    yesBtn: makeYestBtnValue('termsOfUse'),
    noBtn: NO_BTN_VALUE,
  };
  const MODAL_PERSONAL_INFORMATION: Omit<ConfirmModalProps, 'closeModal'> = {
    title: '개인정보 수집 및 이용(필수)',
    children: <PersonalInformation />,
    yesBtn: makeYestBtnValue('personalInformation'),
    noBtn: NO_BTN_VALUE,
  };
  const MODAL_MARKETING: Omit<ConfirmModalProps, 'closeModal'> = {
    title: '마케팅 정보 활용 동의(선택)',
    children: <Marketing />,
    yesBtn: makeYestBtnValue('marketing'),
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
      //btn 클릭 시 이동해야 할 페이지의 경로
      path: null,
      //btn 클릭 시 이동/창 닫기 외의 필요한 기능
      otherFn: () => onClickYesBtn(name),
    };
  }

  const onClickNextBtn = () => {
    setSignUpState((prevState: SignUpStateType) => {
      const newState: SignUpStateType = {
        ...prevState,
        progress: 'nameAndNickName',
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
    setAgreement(prev => ({
      termsOfUse: !prev.termsOfUse,
      personalInformation: !prev.personalInformation,
      ageCondition: !prev.ageCondition,
      marketing: !prev.marketing,
    }));
  };
  function changeAgreement(name: TermsCheckBoxNameType, agree: boolean) {
    switch (name) {
      case 'ageCondition':
        setAgreement((prev: AgreementStateType) => ({
          ...prev,
          ageCondition: agree,
        }));
        break;
      case 'termsOfUse':
        setAgreement((prev: AgreementStateType) => ({
          ...prev,
          termsOfUse: agree,
        }));
        break;
      case 'personalInformation':
        setAgreement((prev: AgreementStateType) => ({
          ...prev,
          personalInformation: !prev.personalInformation,
        }));
        break;
      case 'marketing':
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

  // const handleCheckBoxOfTerm = (event: ChangeEvent<HTMLInputElement>) => {
  //   const target = event.currentTarget;
  //   const name = target.name as TermsCheckBoxNameType;
  //   const checked = target.checked;
  //   if (!checked) {
  //     if (WHOLE_AGREEMENT_CHECK_BOX_EL && WHOLE_AGREEMENT_CHECK_BOX_EL.checked) {
  //       WHOLE_AGREEMENT_CHECK_BOX_EL.checked = false;
  //     }
  //   }
  //   changeAgreement(name, checked);
  // };
  const onClickToShowTerm = (name: TermsContentsNameType) => {
    setOpenModal(true);
    setOpenTargetTerms(name);
  };
  // 이전 버튼으로 현재 단게로 이동했을때, signUpState 상태에 따라  CheckBox 업데이트
  const changeCheckBoxStateBySignUpState = useCallback(() => {
    const valueOfTermsOfUse = signUpState.agreeToTerms.termsOfUse;
    const valueOfPersonalInformation = signUpState.agreeToTerms.personalInformation;
    const valueOfAgeCondition = signUpState.agreeToTerms.ageCondition;
    const valueOfMarketing = signUpState.agreeToTerms.marketing;

    listOfTermsCheckBoxEl.forEach(el => {
      const name = el.name as TermsCheckBoxNameType;
      el.checked = signUpState.agreeToTerms[name];
    });
    if (
      valueOfTermsOfUse &&
      valueOfPersonalInformation &&
      valueOfAgeCondition &&
      valueOfMarketing
    ) {
      if (WHOLE_AGREEMENT_CHECK_BOX_EL && !WHOLE_AGREEMENT_CHECK_BOX_EL.checked) {
        WHOLE_AGREEMENT_CHECK_BOX_EL.checked = true;
      }
    }
  }, [WHOLE_AGREEMENT_CHECK_BOX_EL, signUpState.agreeToTerms]);

  //agreement 의 상태 변화에 따라 disableBtn 상태 변경
  const changeDisableBtn = useCallback(() => {
    if (agreement.termsOfUse && agreement.personalInformation && agreement.ageCondition) {
      setDisableBtn(false);
      if (agreement.marketing && WHOLE_AGREEMENT_CHECK_BOX_EL) {
        WHOLE_AGREEMENT_CHECK_BOX_EL.checked = true;
      }
    } else {
      setDisableBtn(true);
    }
  }, [agreement]);

  useEffect(() => {
    changeCheckBoxStateBySignUpState();
  }, [WHOLE_AGREEMENT_CHECK_BOX_EL, signUpState.agreeToTerms]);

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
            id="termsOfUse"
            label="이용약관(필수)"
            isChecked={agreement.termsOfUse}
            handleChange={() => changeAgreement('termsOfUse', !agreement.termsOfUse)}
            onClickBtn={() => onClickToShowTerm('termsOfUse')}
          />
          <SignUpTerm
            id="personalInformation"
            label="개인정보 수집 및 이용(필수)"
            isChecked={agreement.personalInformation}
            handleChange={() =>
              changeAgreement('personalInformation', !agreement.personalInformation)
            }
            onClickBtn={() => onClickToShowTerm('personalInformation')}
          />
          <SignUpTerm
            id="ageCondition"
            label="14세 이상 이용 동의(필수)"
            isChecked={agreement.ageCondition}
            handleChange={() => changeAgreement('ageCondition', !agreement.ageCondition)}
            onClickBtn={null}
          />
          <SignUpTerm
            id="marketing"
            label="마케팅 정보 활용 동의(선택)"
            isChecked={agreement.marketing}
            handleChange={() => changeAgreement('marketing', !agreement.marketing)}
            onClickBtn={() => onClickToShowTerm('marketing')}
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
