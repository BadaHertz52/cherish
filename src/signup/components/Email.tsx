import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { XSSCheck } from '../../logIn';
import { initialSignUpState, SignUpContext } from '..';
import AlertModal from '../../modals/alertModal';
import { ToastModalType } from '../../modals/modalTypes';
import ToastModal from '../..//modals/toastModal';
import InputForm from './InputForm';
import { initialInputData, InputDataType, SignUpStateType } from './signUpTypes';
import StepInner from './StepInner';
import Timer from './Timer';
import { getPrevData } from './SignUpTopBar';
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
  /**
   * 인증 번호에 대한 검사를 시작했는지 여부
   */
  const [checkAuthNumber, setCheckAuthNumber] = useState<boolean>(false);
  /**
   * 이메일 인증 횟수
   */
  const sendingEmailCount = useRef<number>(0);
  const [authNumber, setAuthNumber] = useState<string | undefined>();
  const [email, setEmail] = useState<InputDataType>(initialInputData);
  const verifiedEmail = useRef<string | undefined>();
  const [disableBtn, setDisAbleBtn] = useState<boolean>(true);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  /**
   * 이메일 인증 시간 오버
   */
  const [openTimer, setOpenTimer] = useState<boolean>(false);
  const [overTime, setOverTime] = useState<boolean>(false);
  /**
   * 이메일 인증 pass
   */
  const [pass, setPass] = useState<boolean>(false);
  const [toastModalState, setToastModalState] = useState<ToastModalType>({
    contents: '',
    top: '0',
    left: '0',
  });
  const nextBtnEl = document.querySelector('.next-btn');
  const nextBtnElDomRect = nextBtnEl?.getClientRects()[0];
  const successSendingEmail = useRef<boolean>(false);

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
  /**
   * 이메일 중복 여부, 서버에 인증 번호를 담은 이메일 요청등을 담당
   */
  const onClickEmailBtn = async () => {
    overTime && setOverTime(false);
    const overSending: boolean = sendingEmailCount.current > 4;
    // 1.가능한 이메일 인증 횟수를 충족한 경우
    if (!overSending) {
      //A. 백엔드에 이메일  중복 여부 확인
      const sameEmail: boolean = false; // 중복 이메일 인지 여부
      // A-1 중복 메일인 경우
      if (sameEmail) {
        setEmail((prev: InputDataType) => {
          const newState: InputDataType = {
            ...prev,
            errorMsg: '이미 회원가입된 이메일이에요.',
          };
          return newState;
        });
      }
      // A-2 유효한 메일
      if (!sameEmail) {
        // a 서버에 이메일 인증 보내기
        // 인증 번호 이메일 전송 성공
        //  a-1 이메일 발송 성공
        if ('이메일 발송 성공') {
          successSendingEmail.current = true;
          // ㄱ. 타이머 작동. 모달 오픈
          setOpenTimer(true);
          if (nextBtnElDomRect !== null && nextBtnElDomRect !== undefined) {
            // modal의 height, width에 따라 top,left 값 변경
            setOpenToastModal(true);
            setToastModalState({
              contents: '인증 이메일이 발송됐어요.',
              // 48: NextBtn.height, 32:modal__inner.padding top +bottom
              top: `${nextBtnElDomRect.top - 48 - 32}px`,
              left: `calc((100vw - 200px) /2 )`,
            });
            sendingEmailCount.current += 1;
          }
        }
      }
    }
    //  2. 할 수 있는 이메일 인증 횟수를 초과한 경우
    if (overSending) {
      setOpenToastModal(false);
      setTimeout(() => {
        setOpenAlertModal(true);
      }, 100);
    }
  };
  const onChangeAuthNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const text = XSSCheck(event.target.value, undefined);
    setAuthNumber(text);
    if (checkAuthNumber) setCheckAuthNumber(false);
  };
  const onClickAuthNumberBtn = async () => {
    //백엔드에 이메인 인증 번호 확인
    const result = '111111'; //서버에서 받은 데이터
    setCheckAuthNumber(true);
    //data는  string type으로
    if (result === authNumber) {
      setPass(true);
      setDisAbleBtn(false);
      setOpenTimer(false);
      verifiedEmail.current = email.value;
    } else {
      setPass(false);
    }
  };
  useEffect(() => {
    getPrevData('email', setEmail, null, null, true);
    if (signUpState.email !== null) {
      setEmail({
        value: signUpState.email,
        errorMsg: null,
      });
      // 이미 인증이 완료 된 경우에 다음 버튼 클릭 가능
      setPass(true);
      setCheckAuthNumber(true);
      verifiedEmail.current = signUpState.email;
      setDisAbleBtn(false);
    }
  }, []);
  useEffect(() => {
    const inputEle = document.querySelector('#input-email') as HTMLInputElement | null;
    if (inputEle !== null) {
      inputEle.disabled = !disableBtn;
    }
  }, [disableBtn]);
  return (
    <div id="email">
      <StepInner disableBtn={disableBtn} onClickNextBtn={onClickNextBtn}>
        <section className="email-form">
          <InputForm id={'email'} data={email} setData={setEmail} />
          {!successSendingEmail.current && (
            <>
              <button
                className="btn-email"
                disabled={
                  email.value !== '' && email.errorMsg == null && signUpState.email == null
                    ? false
                    : true
                }
                type="button"
                onClick={onClickEmailBtn}
              >
                이메일 인증하기
              </button>
              <div className="alert">이메일은 회원가입 후 변경하실 수 없어요.</div>
            </>
          )}
        </section>
        {successSendingEmail.current && (
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
              {openTimer && <Timer setOpenTimer={setOpenTimer} setOverTime={setOverTime} />}
              <button
                disabled={!(openTimer && authNumber !== undefined)}
                className="btn-authNumber"
                type="button"
                onClick={onClickAuthNumberBtn}
              >
                확인
              </button>
            </div>

            <div className="msg">
              {overTime && <p className="msg-over-time">인증 시간이 지났습니다.</p>}
              {!overTime &&
                authNumber !== undefined &&
                checkAuthNumber &&
                (pass ? (
                  <p>인증이 완료 되었어요.</p>
                ) : (
                  <div className="error-msg">
                    <p>인증번호가 일치하지 않아요.</p>
                    <p>인증번호를 다시 확인해주세요.</p>
                  </div>
                ))}
              {!checkAuthNumber && !overTime && (
                <div className="alert">
                  이메일이 수신되지 않는 경우, 입력하신 이메일이 정확한지 확인해 주세요. 또는
                  스펨메일함과 메일함 용량을 확인해 주세요.
                </div>
              )}
            </div>
          </section>
        )}
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
