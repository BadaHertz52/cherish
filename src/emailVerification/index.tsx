import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { XSSCheck } from '../logIn/index';
import AlertModal from '../modals/alertModal';
import { ToastModalType } from '../modals/modalTypes';
import ToastModal from '../modals/toastModal';
import InputForm from '../inputForm';
import { InputDataType } from '../signup/components/signUpTypes';
import Timer from '../signup/components/Timer';
import './style.scss';
type EmailVerificationProps = {
  disableBtn: boolean;
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  email: InputDataType;
  setEmail: Dispatch<SetStateAction<InputDataType>>;
  openToastModal: boolean;
  setOpenToastModal: Dispatch<SetStateAction<boolean>>;
  openAlertModal: boolean;
  setOpenAlertModal: Dispatch<SetStateAction<boolean>>;
  isEmailDuplicate: boolean; //이메일 중복 검사 진행 여부
  onClickCloseBtnInAlertModal: () => void;
};
const EmailVerification = ({
  disableBtn,
  setDisableBtn,
  email,
  setEmail,
  openAlertModal,
  setOpenAlertModal,
  openToastModal,
  setOpenToastModal,
  onClickCloseBtnInAlertModal,
  isEmailDuplicate,
}: EmailVerificationProps) => {
  /**
   * 인증 번호에 대한 검사를 시작했는지 여부
   */
  const [checkAuthNumber, setCheckAuthNumber] = useState<boolean>(false);
  /**
   * 이메일 인증 횟수
   */
  const sendingEmailCount = useRef<number>(0);
  const [authNumber, setAuthNumber] = useState<string | undefined>();
  const verifiedEmail = useRef<string | undefined>();
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
  /**
   * 이메일 중복 여부, 서버에 인증 번호를 담은 이메일 요청등을 담당
   */
  const checkDuplicateEmail = () => {
    let result: boolean = false;
    //[api]이메일 중복 검사
    return result;
  };
  const sendVerificationEmail = () => {
    let result: boolean = true;
    // [api] 인증 이메일 보내기
    return result;
  };
  const onClickEmailBtn = async () => {
    overTime && setOverTime(false);
    const overSending: boolean = sendingEmailCount.current > 4;
    // 1.가능한 이메일 인증 횟수를 충족한 경우
    if (!overSending) {
      //A. 백엔드에 이메일  중복 여부 확인
      let duplicate: boolean = false; // 중복 이메일
      if (isEmailDuplicate) {
        const result = checkDuplicateEmail();
        // result 값에 따라 duplicate 값 변경
      }
      // A-1 중복 메일인 경우
      if (duplicate) {
        setEmail((prev: InputDataType) => {
          const newState: InputDataType = {
            ...prev,
            errorMsg: '이미 회원가입된 이메일이에요.',
          };
          return newState;
        });
      }
      // A-2 유효한 메일
      if (!duplicate) {
        // a 서버에 이메일 인증 보내기
        const result = sendVerificationEmail();
        // 인증 번호 이메일 전송 성공
        //  a-1 이메일 발송 성공
        if (result) {
          successSendingEmail.current = true;
          // ㄱ. 타이머 작동. 모달 오픈
          setOpenTimer(true);
          if (nextBtnElDomRect !== null && nextBtnElDomRect !== undefined) {
            // modal의 height, width에 따라 top,left 값 변경
            setOpenToastModal(true);
            setToastModalState({
              contents: '인증 이메일이 발송됐어요.',
              //  39:toastModal.height
              top: `${nextBtnElDomRect.top - 39 - 16}px`,
              left: `20vw`,
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
  //서버에서 받은 데이터
  const getAuthNumber = () => {
    let result = '111111';
    //[api]
    return result;
  };
  const onClickAuthNumberBtn = async () => {
    //백엔드에 이메인 인증 번호 확인
    const result = getAuthNumber();
    setCheckAuthNumber(true);
    //data는  string type으로
    if (authNumber !== undefined && result === authNumber) {
      setPass(true);
      setDisableBtn(false);
      setOpenTimer(false);
      verifiedEmail.current = email.value;
    } else {
      setPass(false);
    }
  };
  useEffect(() => {
    if (email.value && !email.errorMsg) {
      // 이미 인증이 완료 된 경우에 다음 버튼 클릭 가능
      setPass(true);
      setCheckAuthNumber(true);
      verifiedEmail.current = email.value;
      setDisableBtn(false);
    }
  }, []);
  useEffect(() => {
    const inputEle = document.querySelector('#input-email') as HTMLInputElement | null;
    if (inputEle !== null) {
      inputEle.disabled = !disableBtn;
    }
  }, [disableBtn]);
  return (
    <div className="email-verification">
      <section className="email-form">
        <InputForm id={'email'} data={email} setData={setEmail} />
        {!successSendingEmail.current && (
          <>
            <button
              className="btn-email"
              disabled={email.value !== '' && email.errorMsg == null && !pass ? false : true}
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
      {openToastModal && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
      )}
      {openAlertModal && (
        <AlertModal center={true} short={true} closeModal={onClickCloseBtnInAlertModal}>
          <p>유효한 이메일 인증 횟수를 초과했습니다.</p>
          <p>간편 가입을 처음부터 다시 시작하세요</p>
        </AlertModal>
      )}
    </div>
  );
};

export default EmailVerification;
