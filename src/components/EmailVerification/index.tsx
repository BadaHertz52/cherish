import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { XSSCheck } from '@/pages/LogIn/index';
import { Timer, AlertModal, InputForm, ToastModal } from '@/components';
import { ERROR_MSG, InputDataType, initialInputData } from '@/pages/SignUp/signUpTypes';
import './style.scss';
import { ToastModalType } from '../Modals/modalTypes';
import { getToastModalPosition } from '@/pages/SignUp/functions';

type EmailVerificationProps = {
  additionOfLabel?: string; // InputForm의 additionOfLabel
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  email: InputDataType;
  setEmail: Dispatch<SetStateAction<InputDataType>>;
  openAuthNumberForm: boolean;
  setOpenAuthNumberForm: Dispatch<SetStateAction<boolean>>;
  emailDuplicationChecker: boolean; //이메일 중복 검사 진행 여부
  toastModalPositionTargetEl: HTMLElement | null; // toastModal 위치,
  inFindPw?: boolean; // 비밀번호 찾기 페이지에서 사용하는 지 여부
};
const EmailVerification = ({
  additionOfLabel,
  setDisableBtn,
  email,
  setEmail,
  openAuthNumberForm,
  setOpenAuthNumberForm,
  emailDuplicationChecker,
  toastModalPositionTargetEl,
  inFindPw,
}: EmailVerificationProps) => {
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const initialToastModalState: ToastModalType = {
    contents: '',
    top: '0',
    left: '0',
  };
  const [toastModalState, setToastModalState] = useState<ToastModalType>(initialToastModalState);
  /**
   * 인증 번호에 대한 검사를 시작했는지 여부
   */
  const [checkAuthNumber, setCheckAuthNumber] = useState<boolean>(false);
  const [authNumber, setAuthNumber] = useState<InputDataType>(initialInputData);
  const verifiedEmail = useRef<string | undefined>();
  /**
   * 이메일 인증 시간 오버
   */
  const [openTimer, setOpenTimer] = useState<boolean>(false);
  const [overTime, setOverTime] = useState<boolean>(false);

  const inputEl = document.querySelector('#input-email') as HTMLInputElement | null;
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
    const overSending: boolean = false;
    // 1.가능한 이메일 인증 횟수를 충족한 경우
    if (!overSending) {
      //A. 백엔드에 이메일  중복 여부 확인
      let emailDuplicate: boolean = false; // 중복 이메일
      // 간편가입 시 이메일 중복 검사 진행, 비밀번호 찾기에서는 이메일 중복 검사 진행하지 않음
      if (emailDuplicationChecker) {
        emailDuplicate = checkDuplicateEmail();
        // result 값에 따라 duplicate 값 변경
      }
      // A-1 중복 메일인 경우
      if (emailDuplicate) {
        setEmail((prev: InputDataType) => {
          const newState: InputDataType = {
            ...prev,
            errorMsg: '이미 회원가입된 이메일이에요.',
          };
          return newState;
        });
      }
      // A-2 유효한 메일
      if (!emailDuplicate) {
        // a 서버에 이메일 인증 보내기
        const result = sendVerificationEmail();
        // 인증 번호 이메일 전송 성공
        //  a-1 이메일 발송 성공
        if (result) {
          // ㄱ. 타이머 작동. 모달 오픈
          setOpenTimer(true);
          setOpenToastModal(true);
          setTimeout(() => {
            setOpenAuthNumberForm(true);
            setOpenToastModal(false);
            setToastModalState(initialToastModalState);
          }, 1000);
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
    setAuthNumber({
      value: text,
      errorMsg: null,
    });
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
    if (authNumber.value && result === authNumber.value) {
      //서버에서 받은 인증 번호와 사용자가 입력한 인증 번호가 일치할 경우
      setOpenTimer(false);
      verifiedEmail.current = email.value;
      setOpenToastModal(true);
      if (inFindPw) {
        setTimeout(() => {
          setDisableBtn(false);
          setOpenToastModal(false);
        }, 1000);
      } else {
        setDisableBtn(false);
      }
    } else {
      //인증 번호 불일치
      setAuthNumber(prev => ({
        ...prev,
        errorMsg: ERROR_MSG.invalidAuthNumber,
      }));
    }
  };
  const handleBlurOfAuthNumber = () => {
    if (!authNumber.value) {
      setAuthNumber({
        ...authNumber,
        errorMsg: ERROR_MSG.required,
      });
    }
  };
  const onClickCloseBtnInAlertModal = () => {
    //[todo] 이메일 인증 횟수 초과 시 해야하는 것
    setOpenAlertModal(false);
    setOpenAuthNumberForm(false);
  };

  const changeToastModalState = useCallback(() => {
    const position = getToastModalPosition();
    if (openToastModal && position) {
      const { top, left } = position;
      if (openAuthNumberForm) {
        // 비밀번호 찾기 페이지에서는 toastModalPositionTargetEl === null
        const newTop = toastModalPositionTargetEl
          ? top - toastModalPositionTargetEl.offsetHeight - 16
          : top;
        const modalForPass: ToastModalType = {
          contents: '인증되었습니다.',
          top: `${newTop}px`,
          left: left,
        };
        setToastModalState(modalForPass);
      } else {
        const modalForSendingEmail: ToastModalType = {
          contents: '인증 이메일을 발송했어요.',

          top: `${top}px`,
          left: left,
        };
        setToastModalState(modalForSendingEmail);
      }
    }
  }, [openToastModal]);

  useEffect(() => {
    if (email.value && !email.errorMsg) {
      // 이미 인증이 완료 된 경우에 다음 버튼 클릭 가능
      setCheckAuthNumber(true);
      verifiedEmail.current = email.value;
      setDisableBtn(false);
    }
  }, []);
  useEffect(() => {
    if (inputEl) {
      inputEl.disabled = openTimer;
    }
  }, [openTimer]);

  useEffect(() => {
    // 타이머 시간을 경과한 경우, 이메일 작성란 다시 열기
    if (overTime) {
      setTimeout(() => {
        setOpenAuthNumberForm(false);
        if (inputEl) inputEl.disabled = false;
      }, 500);
    }
  }, [overTime]);

  useEffect(() => {
    changeToastModalState();
  }, [openToastModal]);
  return (
    <div className="email-verification">
      <section className="email-form">
        <InputForm additionOfLabel={additionOfLabel} id={'email'} data={email} setData={setEmail} />
        {!openAuthNumberForm && (
          <>
            <button
              className="btn-email"
              disabled={!(email.value && !email.errorMsg)}
              type="button"
              onClick={onClickEmailBtn}
            >
              이메일 인증하기
            </button>
            <div className="alert">이메일은 회원가입 후 변경하실 수 없어요.</div>
          </>
        )}
      </section>
      {openAuthNumberForm && (
        <section className="authNumber-form">
          <label htmlFor="authNumber">인증 번호</label>
          <div className="authNumber-form__contents">
            <input
              id="authNumber"
              name="authNumber"
              value={authNumber.value}
              onChange={onChangeAuthNumber}
              onBlur={handleBlurOfAuthNumber}
              placeholder="인증번호(6자리)"
            />
            {openTimer && <Timer setOpenTimer={setOpenTimer} setOverTime={setOverTime} />}
            <button
              disabled={!(openTimer && authNumber)}
              className="btn-authNumber"
              type="button"
              onClick={onClickAuthNumberBtn}
            >
              확인
            </button>
          </div>

          <div className="msg">
            {overTime && <p className="msg-over-time">인증 시간이 지났습니다.</p>}
            {!overTime && authNumber.errorMsg && (
              <div className="error-msg">
                <p>{authNumber.errorMsg}</p>
                <p>인증번호를 다시 확인해주세요.</p>
              </div>
            )}
            {!checkAuthNumber && !overTime && (
              <div className="alert">
                이메일이 수신되지 않는 경우, 입력하신 이메일이 정확한지 확인해 주세요. 또는
                스펨메일함과 메일함 용량을 확인해 주세요.
              </div>
            )}
          </div>
        </section>
      )}
      {openAlertModal && (
        <AlertModal center={true} short={true} closeModal={onClickCloseBtnInAlertModal}>
          <p>유효한 이메일 인증 횟수를 초과했습니다.</p>
        </AlertModal>
      )}
      {openToastModal && toastModalState.contents && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
      )}
    </div>
  );
};

export default EmailVerification;
