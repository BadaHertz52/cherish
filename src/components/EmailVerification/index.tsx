import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { XSSCheck } from '@/pages/LogIn/index';
import { Timer, ToastModal, AlertModal, InputForm } from '@/components';
import { ToastModalType } from '@/components/Modals/modalTypes';
import { ERROR_MSG, InputDataType, initialInputData } from '@/pages/SignUp/signUpTypes';
import './style.scss';
import { getToastModalPosition } from '@/pages/SignUp/functions';

type EmailVerificationProps = {
  additionOfLabel?: string; // InputForm의 additionOfLabel
  disableBtn?: boolean;
  setDisableBtn?: Dispatch<SetStateAction<boolean>>;
  email: InputDataType;
  setEmail: Dispatch<SetStateAction<InputDataType>>;
  emailDuplicationChecker: boolean; //이메일 중복 검사 진행 여부
  toastModalPositionTargetEl: HTMLElement | null; // toastModal 위치
};
const EmailVerification = ({
  additionOfLabel,
  disableBtn,
  setDisableBtn,
  email,
  setEmail,
  emailDuplicationChecker,
  toastModalPositionTargetEl,
}: EmailVerificationProps) => {
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  /**
   * 인증 번호에 대한 검사를 시작했는지 여부
   */
  const [checkAuthNumber, setCheckAuthNumber] = useState<boolean>(false);
  /**
   * 이메일 인증 횟수
   */
  const sendingEmailCount = useRef<number>(0);
  const [authNumber, setAuthNumber] = useState<InputDataType>(initialInputData);
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

  const successSendingEmail = useRef<boolean>(false);
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

  const changeToastModalState = (contents: string) => {
    if (toastModalPositionTargetEl) {
      const { top, left } = getToastModalPosition(toastModalPositionTargetEl);
      setToastModalState({
        contents: contents,
        // 39: toastModal.height
        top: top,
        left: left,
      });
    }
  };
  const onClickEmailBtn = async () => {
    overTime && setOverTime(false);
    const overSending: boolean = sendingEmailCount.current > 4;
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
          successSendingEmail.current = true;
          // ㄱ. 타이머 작동. 모달 오픈
          setOpenTimer(true);
          sendingEmailCount.current += 1;
          setOpenToastModal(true);
          changeToastModalState('인증 이메일이 발송됐어요.');
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
      setPass(true);
      setDisableBtn && setDisableBtn(false);
      setOpenTimer(false);
      verifiedEmail.current = email.value;
      setOpenToastModal(true);
      changeToastModalState('인증이 완료 되었어요.');
    } else {
      setPass(false);
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
  };
  useEffect(() => {
    if (email.value && !email.errorMsg) {
      // 이미 인증이 완료 된 경우에 다음 버튼 클릭 가능
      setPass(true);
      setCheckAuthNumber(true);
      verifiedEmail.current = email.value;
      setDisableBtn && setDisableBtn(false);
    }
  }, []);
  //EmailVerification 에서 disableBtn 상태 변경 시
  useEffect(() => {
    if (inputEl && disableBtn !== undefined) {
      inputEl.disabled = !disableBtn;
    }
  }, [disableBtn]);
  return (
    <div className="email-verification">
      <section className="email-form">
        <InputForm additionOfLabel={additionOfLabel} id={'email'} data={email} setData={setEmail} />
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
              value={authNumber.value}
              onChange={onChangeAuthNumber}
              onBlur={handleBlurOfAuthNumber}
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
