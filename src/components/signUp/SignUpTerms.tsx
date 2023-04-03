import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { SignUpContext } from '../../pages/SignUp';
import CheckBox from '../CheckBox';
import {
  AgreementStateType,
  SessionDataType,
  SignUpStateType,
  TermsCheckBoxNameType,
} from './signUpTypes';
import StepInner from './StepInner';
import ConfirmModal from '../modals/ConfirmModal';
import { ConfirmModalBtnType, ConfirmModalType } from '../modals/modalTypes';

type SignUpTermProps = {
  id: TermsCheckBoxNameType;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickBtn: () => void;
};
const SignUpTerm = ({ id, label, onChange, onClickBtn }: SignUpTermProps) => {
  const termRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const labelEl = termRef.current?.querySelector('.label');
    if (labelEl !== null && label !== undefined) {
      labelEl?.addEventListener('click', onClickBtn);
    }
  }, [termRef.current]);
  return (
    <div className="term" ref={termRef}>
      <CheckBox id={id} name={id} label={label} onChange={onChange} />
      <div className="term__contents">
        <div className="label" onClick={onClickBtn}>
          {label}
        </div>
        <button className="btn-open-modal" onClick={onClickBtn} type="button">
          내용보기
        </button>
      </div>
    </div>
  );
};
const SignUpTerms = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [agreement, setAgreement] = useState<AgreementStateType>(signUpState.agreeToTerms);

  // NextBtn 비활성화 여부
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const WHOLE_AGREEMENT_CHECK_BOX_EL = document.querySelector(
    `#whole-agree`,
  ) as HTMLInputElement | null;
  const modalForTermsAndCondition: ConfirmModalType = {
    title: '이용약관(필수)',
    contents: 'contents',
    yesBtn: makeYestBtnValue('termsAndCondition'),
    noBtn: makeNoBtnValue('termsAndCondition'),
  };
  const modalForPersonalInformation: ConfirmModalType = {
    title: '개인정보 수집 및 이용(필수)',
    contents: 'contents',
    yesBtn: makeYestBtnValue('personalInformation'),
    noBtn: makeNoBtnValue('personalInformation'),
  };
  const modalForAgeCondition: ConfirmModalType = {
    title: '14세 이상 이용 동의(필수)',
    contents: 'contents',
    yesBtn: makeYestBtnValue('personalInformation'),
    noBtn: makeNoBtnValue('personalInformation'),
  };
  const modalForMarketing: ConfirmModalType = {
    title: '마케팅 정보 활용 동의(선택)',
    contents: 'contents',
    yesBtn: makeYestBtnValue('marketing'),
    noBtn: makeNoBtnValue('marketing'),
  };
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<ConfirmModalType>(modalForTermsAndCondition);
  function makeYestBtnValue(name: TermsCheckBoxNameType): ConfirmModalBtnType {
    return {
      //btn 의 text node
      text: '동의하기',
      //btn 클릭 시 이동해야 할 페이지의 경로
      path: null,
      //btn 클릭 시 이동/창 닫기 외의 필요한 기능
      otherFn: () => onClickYesBtn(name),
    };
  }
  function makeNoBtnValue(name: TermsCheckBoxNameType): ConfirmModalBtnType {
    return {
      //btn 의 text node
      text: '닫기',
      //btn 클릭 시 이동해야 할 페이지의 경로
      path: null,
      //btn 클릭 시 이동/창 닫기 외의 필요한 기능
      otherFn: null,
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
        termsAndCondition: checked,
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
      case 'termsAndCondition':
        setAgreement((prev: AgreementStateType) => {
          const newState: AgreementStateType = {
            ...prev,
            termsAndCondition: checked,
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
  const onClickToShowTerm = (name: TermsCheckBoxNameType) => {
    setOpenModal(true);
    switch (name) {
      case 'termsAndCondition':
        setModalState(modalForTermsAndCondition);
        break;
      case 'personalInformation':
        setModalState(modalForPersonalInformation);
        break;
      case 'ageCondition':
        setModalState(modalForAgeCondition);
        break;
      case 'marketing':
        setModalState(modalForMarketing);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const valueOfTermsAndCondition = signUpState.agreeToTerms.termsAndCondition;
    const valueOfPersonalInformation = signUpState.agreeToTerms.personalInformation;
    const valueOfAgeCondition = signUpState.agreeToTerms.ageCondition;
    const valueOfMarketing = signUpState.agreeToTerms.marketing;
    const listOfTermsCheckBoxEl = document.querySelectorAll(
      '.terms-group input',
    ) as NodeListOf<HTMLInputElement>;
    if (
      valueOfTermsAndCondition &&
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
      el.checked = signUpState.agreeToTerms[`${name}`];
    });
  }, []);
  useEffect(() => {
    if (agreement.termsAndCondition && agreement.personalInformation && agreement.ageCondition) {
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
            id="termsAndCondition"
            label="이용약관(필수)"
            onChange={handleCheckBoxOfTerm}
            onClickBtn={() => onClickToShowTerm('termsAndCondition')}
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
            onClickBtn={() => onClickToShowTerm('ageCondition')}
          />
          <SignUpTerm
            id="marketing"
            label="마케팅 정보 활용 동의(선택)"
            onChange={handleCheckBoxOfTerm}
            onClickBtn={() => onClickToShowTerm('marketing')}
          />
        </section>
      </StepInner>
      {openModal && <ConfirmModal modalState={modalState} closeModal={() => setOpenModal(false)} />}
    </div>
  );
};

export default SignUpTerms;
