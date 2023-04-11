import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { SignUpContext } from '../../../pages/SignUp';
import CheckBox from '@/components/CheckBox';
import {
  AgreementStateType,
  SignUpStateType,
  TermsCheckBoxNameType,
  TermsContentsNameType,
} from '../signUpTypes';
import StepInner from './StepInner';
import ConfirmModal, { ConfirmModalProps } from '@/components/Modals/ConfirmModal';
import { ConfirmModalBtnType } from '@/components/Modals/modalTypes';
import TermsOfUse from '../../../pages/SignUp/components/terms/TermsOfUse';
import PersonalInformation from '../../../pages/SignUp/components/terms/PersonalInformation';
import Marketing from '../../../pages/SignUp/components/terms/Marketing';

type SignUpTermProps = {
  id: TermsCheckBoxNameType;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickBtn: (() => void) | null;
};
const SignUpTerm = ({ id, label, onChange, onClickBtn }: SignUpTermProps) => {
  const termRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (onClickBtn !== null) onClickBtn();
  };
  useEffect(() => {
    const labelEl = termRef.current?.querySelector('.label');
    if (labelEl !== null && label !== undefined) {
      labelEl?.addEventListener('click', handleClick);
    }
  }, [termRef.current]);
  return (
    <div className="term" ref={termRef}>
      <CheckBox id={id} name={id} label={label} onChange={onChange} />
      <div className="term__contents">
        <div className="label" onClick={handleClick}>
          {label}
        </div>
        {onClickBtn !== null && (
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
  const NO_BTN_VALUE: ConfirmModalBtnType = {
    //btn 의 text node
    text: '닫기',
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
  const handleWholeAgree = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | null;
    if (target !== null) {
      const checked = target.checked;
      setAgreement({
        termsOfUse: checked,
        personalInformation: checked,
        ageCondition: checked,
        marketing: checked,
      });
      const listOfInput = document.querySelectorAll('input');
      listOfInput.forEach(el => (el.checked = checked));
    }
  };
  function changeAgreement(name: TermsCheckBoxNameType, checked: boolean) {
    switch (name) {
      case 'termsOfUse':
        setAgreement((prev: AgreementStateType) => {
          const newState: AgreementStateType = {
            ...prev,
            termsOfUse: checked,
          };
          return newState;
        });
        break;
      case 'personalInformation':
        setAgreement((prev: AgreementStateType) => {
          const newState: AgreementStateType = {
            ...prev,
            personalInformation: checked,
          };
          return newState;
        });
        break;
      case 'marketing':
        setAgreement((prev: AgreementStateType) => {
          const newState: AgreementStateType = {
            ...prev,
            marketing: checked,
          };
          return newState;
        });
        break;

      default:
        break;
    }
  }
  function onClickYesBtn(name: TermsCheckBoxNameType) {
    const targetInputEl = document.querySelector(`#${name}`) as HTMLInputElement | null;
    if (targetInputEl !== null) {
      targetInputEl.checked = true;
    }
    changeAgreement(name, true);
  }
  const handleCheckBoxOfTerm = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | null;
    if (target !== null) {
      const name = target.name as TermsCheckBoxNameType;
      const checked = target.checked;
      if (!checked) {
        if (WHOLE_AGREEMENT_CHECK_BOX_EL !== null && WHOLE_AGREEMENT_CHECK_BOX_EL.checked) {
          WHOLE_AGREEMENT_CHECK_BOX_EL.checked = false;
        }
      }
      changeAgreement(name, checked);
    }
  };
  const onClickToShowTerm = (name: TermsContentsNameType) => {
    setOpenModal(true);
    setOpenTargetTerms(name);
  };

  useEffect(() => {
    const valueOfTermsOfUse = signUpState.agreeToTerms.termsOfUse;
    const valueOfPersonalInformation = signUpState.agreeToTerms.personalInformation;
    const valueOfAgeCondition = signUpState.agreeToTerms.ageCondition;
    const valueOfMarketing = signUpState.agreeToTerms.marketing;
    const listOfTermsCheckBoxEl = document.querySelectorAll(
      '.terms-group input',
    ) as NodeListOf<HTMLInputElement>;
    if (
      valueOfTermsOfUse &&
      valueOfPersonalInformation &&
      valueOfAgeCondition &&
      valueOfMarketing
    ) {
      if (WHOLE_AGREEMENT_CHECK_BOX_EL !== null) {
        WHOLE_AGREEMENT_CHECK_BOX_EL.checked = true;
      }
    }
    listOfTermsCheckBoxEl.forEach(el => {
      const name = el.name as TermsCheckBoxNameType;
      el.checked = signUpState.agreeToTerms[name];
    });
  }, []);
  useEffect(() => {
    if (agreement.termsOfUse && agreement.personalInformation && agreement.ageCondition) {
      setDisableBtn(false);
      if (agreement.marketing && WHOLE_AGREEMENT_CHECK_BOX_EL !== null) {
        WHOLE_AGREEMENT_CHECK_BOX_EL.checked = true;
      }
    } else {
      setDisableBtn(true);
    }
  }, [agreement]);
  return (
    <div id="sign-up__terms" className="step">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <div className="top">
          <div className="header">
            <h2>환영해요!</h2>
            <h3>아래 약관에 동의하시면</h3>
            <h3>정성스러운 선물을 추천해드려요</h3>
          </div>
          <CheckBox
            id="whole-agree"
            name="whole-agree"
            label="전체 동의"
            onChange={handleWholeAgree}
          />
        </div>
        <section className="terms-group">
          <SignUpTerm
            id="termsOfUse"
            label="이용약관(필수)"
            onChange={handleCheckBoxOfTerm}
            onClickBtn={() => onClickToShowTerm('termsOfUse')}
          />
          <SignUpTerm
            id="personalInformation"
            label="개인정보 수집 및 이용(필수)"
            onChange={handleCheckBoxOfTerm}
            onClickBtn={() => onClickToShowTerm('personalInformation')}
          />
          <SignUpTerm
            id="ageCondition"
            label="14세 이상 이용 동의(필수)"
            onChange={handleCheckBoxOfTerm}
            onClickBtn={null}
          />
          <SignUpTerm
            id="marketing"
            label="마케팅 정보 활용 동의(선택)"
            onChange={handleCheckBoxOfTerm}
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
