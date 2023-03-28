import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { XSSCheck } from '../../pages/LogIn';
import { initialSignUpState, SignUpContext } from '../../pages/SignUp';
import AlertModal from '../modals/AlertModal';
import { ConfirmModalType, ModalCommonType, ToastModalType } from '../modals/modalTypes';
import ToastModal from '../modals/ToastModal';
import InputForm from './InputForm';
import { initialInputData, InputDataType, SessionDataType, SignUpStateType } from './signUpTypes';
import StepInner from './StepInner';
import '../../assets/signUp/emailModal.scss';
import Timer from './Timer';
const EmailAlertModalContents = () => {
  return (
    <>
      <p>유효한 이메일 인증 횟수를 초과했습니다.</p>
      <p>간편 가입을 처음부터 다시 시작하세요</p>
    </>
  );
};
const Email = () => {
  const { signUpState, setSignUpState } = useContext(SignUpContext);
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const [authNumber, setAuthNumber] = useState<string | undefined>();
  const confirmAuthNumber = useRef<boolean>(false);
  const [pass, setPass] = useState<boolean>(false);
  const emailVerificationCount = useRef<number>(0);
  const [disableBtn, setDisAbleBtn] = useState<boolean>(true);
  const nextBtnEl = document.querySelector('.next-btn');
  const nextBtnElDomRect = nextBtnEl?.getClientRects()[0];
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  const [toastModalState, setToastModalState] = useState<ToastModalType>({
    contents: '',
    top: '0',
    left: '0',
  });
  const [openTimer, setOpenTimer] = useState<boolean>(false);
  const [overTime, setOverTime] = useState<boolean>(false);
  const onClickCloseBtnInAlertModal = () => {
    if (sessionStorage.getItem('signUpBackUpData') !== null) {
      sessionStorage.removeItem('signUpBackUpData');
    }
    setSignUpState({
      ...initialSignUpState,
      progress: 'agreeToTerms',
    });
    setOpenAlertModal(false);
  };
  const onClickNextBtn = () => {
    setSignUpState((prev: SignUpStateType) => {
      const newState: SignUpStateType = {
        ...prev,
        progress: 'pw',
        email: email.value,
      };
      return newState;
    });
  };
  const onClickEmailBtn = async () => {
    overTime && setOverTime(false);
    // 가능한 이메일 인증 횟수를 충족한 경우
    if (emailVerificationCount.current <= 4) {
      // 백엔드에 이메일 보내기
      // await fetch('/member/email-code', {
      //   method:'POST',
      //   body : JSON.stringify({email:email})
      // })
      // 이메일 발송 성공 시 모달
      setOpenTimer(true);
      if (nextBtnElDomRect !== null && nextBtnElDomRect !== undefined) {
        // modal의 height, width에 따라 top,left 값 변경
        setOpenToastModal(true);
        setToastModalState({
          contents: '인증 이메일이 발송됐습니다.',
          // 48: NextBtn.height, 32:modal__inner.padding top +bottom
          top: `${nextBtnElDomRect.top - 48 - 32}px`,
          left: `calc((100vw - 200px) /2 )`,
        });
        emailVerificationCount.current += 1;
      }
    } else {
      // 할 수 있는 이메일 인증 횟수를 초과한 경우
      setOpenToastModal(false);
      setTimeout(() => {
        setOpenAlertModal(true);
      }, 100);
    }
  };
  const onChangeAuthNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const text = XSSCheck(event.target.value, undefined);
    setAuthNumber(text);
    if (confirmAuthNumber.current) confirmAuthNumber.current = false;
  };
  const onClickAuthNumberBtn = async () => {
    setOpenTimer(false);
    //백엔드에 이메인 인증 번호 확인
    const data = await (
      await fetch('/member/email-code', {
        method: 'get',
      })
    ).json();
    confirmAuthNumber.current = true;
    //data는  string type으로
    if (authNumber !== undefined && data === authNumber) {
      setPass(true);
      setDisAbleBtn(false);
    } else {
      setPass(false);
    }
  };
  useEffect(() => {
    const item = sessionStorage.getItem('signUpBackUpData');
    if (item !== null) {
      const preState: SessionDataType[] = JSON.parse(item);
      const preEmailState = preState.filter(i => i.key === 'email')[0];
      if (preEmailState !== undefined) {
        setEmail({
          value: preEmailState.value,
          errorMsg: null,
        });
        sessionStorage.removeItem('signUpBackUpData');
      }
    }
    if (signUpState.email !== null) {
      setEmail({
        value: signUpState.email,
        errorMsg: null,
      });
    }
  }, []);
  return (
    <div id="email">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <section className="email-form">
          <InputForm id={'email'} data={email} setData={setEmail} />
          <button
            className="btn-email"
            disabled={email.value !== '' && email.errorMsg == null ? false : true}
            type="button"
            onClick={onClickEmailBtn}
          >
            이메일 인증하기
          </button>
          <div>
            이메일이 수신되지 않는 경우, 입력하신 이메일이 정확한지 확인해 주세요. 또는 스펨메일함과
            메일함 용량을 확인해 주세요.
          </div>
        </section>
        <section className="authNumber-form">
          <label htmlFor="authNumber">인증 번호</label>
          <div className="authNumber-form__contents">
            <input
              id="authNumber"
              name="authNumber"
              value={authNumber}
              onChange={onChangeAuthNumber}
              placeholder="인증번호(6자리)"
            />
            <div>
              <button
                disabled={!openTimer}
                className="btn-authNumber"
                type="button"
                onClick={onClickAuthNumberBtn}
              >
                확인
              </button>
              {openTimer && <Timer setOpenTimer={setOpenTimer} setOverTime={setOverTime} />}
            </div>
          </div>
          <div className="msg">
            {overTime ? (
              <p className="msg-over-time">인증 시간이 지났습니다.</p>
            ) : (
              !pass &&
              authNumber !== undefined && (
                <div className="error-msg">
                  <p>인증번호가 일치하지 않아요.</p>
                  <p>인증번호를 다시 확인해주세요.</p>
                </div>
              )
            )}
          </div>
        </section>
      </StepInner>
      {openToastModal && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
      )}
      {openAlertModal && (
        <AlertModal
          modalState={<EmailAlertModalContents />}
          closeModal={onClickCloseBtnInAlertModal}
        />
      )}
    </div>
  );
};

export default Email;
