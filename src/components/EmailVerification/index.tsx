import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Timer, AlertModal, InputForm, ToastModal } from '@/components';
import { XSSCheck } from '@/pages/LogIn/index';
import { getToastModalPosition } from '@/pages/SignUp/functions';
import {
  ERROR_MSG,
  INPUT_FORM_ID,
  InputDataType,
  InputFormIdType,
  initialInputData,
} from '@/pages/SignUp/signUpTypes';

import './style.scss';
import { ToastModalType } from '../Modals/modalTypes';

import { EMAIL_API_RESULT_TYPE, EmailAPIResult } from './types';

type EmailVerificationProps = {
  additionOfLabel?: string; // InputForm의 additionOfLabel
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  email: InputDataType;
  setEmail: Dispatch<SetStateAction<InputDataType>>;
  openAuthNumberForm: boolean;
  setOpenAuthNumberForm: Dispatch<SetStateAction<boolean>>;
  toastModalPositionTargetEl: HTMLElement | null; // toastModal 위치,
  inFindPw?: boolean; // 비밀번호 찾기 페이지에서 사용하는 지 여부
  sendVerificationEmail: () => Promise<EmailAPIResult>; // 이메일 전송 api 진행
};
const EmailVerification = ({
  additionOfLabel,
  setDisableBtn,
  email,
  setEmail,
  openAuthNumberForm,
  setOpenAuthNumberForm,
  toastModalPositionTargetEl,
  inFindPw,
  sendVerificationEmail,
}: EmailVerificationProps) => {
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const initialToastModalState: ToastModalType = {
    contents: '',
    top: '0',
    left: '0',
  };
  const [toastModalState, setToastModalState] = useState<ToastModalType>(initialToastModalState);
  const [alertModalChild, setAlertModalChilde] = useState<ReactNode>();
  const childOfModalForOverSending = (
    <div className="msg-over-sending">
      <p>해당 메일에 대한 인증 횟수를 초과했어요.</p>
      <p>내일 다시 시도하세요.</p>
    </div>
  );
  const childOfModalForPause = <p>5분간 해당 이메일에 대한 인증을 하실 수 없어요.</p>;
  const [authNumber, setAuthNumber] = useState<InputDataType>(initialInputData);
  const verifiedEmail = useRef<string | undefined>();
  /**
   * 이메일 인증 시간 오버
   */
  const [openTimer, setOpenTimer] = useState<boolean>(false);
  const [overTime, setOverTime] = useState<boolean>(false);
  const onClickEmailBtn = async () => {
    try {
      const result = await sendVerificationEmail();
      switch (result.type) {
        case EMAIL_API_RESULT_TYPE.duplicate:
          setEmail((prev: InputDataType) => ({
            ...prev,
            errorMsg: '이미 회원가입된 이메일이에요.',
          }));
          break;
        case EMAIL_API_RESULT_TYPE.pause:
          setOpenToastModal(false);
          setAlertModalChilde(childOfModalForPause);
          setTimeout(() => {
            setOpenAlertModal(true);
          }, 100);
          break;
        case EMAIL_API_RESULT_TYPE.overSending:
          setOpenToastModal(false);
          setAlertModalChilde(childOfModalForOverSending);
          setTimeout(() => {
            setOpenAlertModal(true);
          }, 100);
          break;
        case EMAIL_API_RESULT_TYPE.serverError:
          console.error(result.msg);
          break;
        case EMAIL_API_RESULT_TYPE.success:
          setOpenTimer(true);
          setOpenToastModal(true);
          setTimeout(() => {
            setOpenAuthNumberForm(true);
            setOpenToastModal(false);
          }, 1000);
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onChangeAuthNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const text = XSSCheck(event.target.value, undefined);
    setAuthNumber({
      value: text,
    });
  };
  //서버에서 받은 데이터
  const getAuthNumber = () => {
    const result = '111111';
    //[api]
    return result;
  };
  const onClickAuthNumberBtn = async () => {
    //백엔드에 이메인 인증 번호 확인
    const result = getAuthNumber();
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
  //이메일 인증 5분간 중단/ 하루 인증 횟수 초과 시 , 이메일 작성 폼으로 돌아감
  const onClickCloseBtnInAlertModal = () => {
    setOpenAlertModal(false);
    setAlertModalChilde('');
    setOpenAuthNumberForm(false);
  };

  const changeToastModalState = useCallback(() => {
    const position = getToastModalPosition();
    if (openToastModal && position) {
      const { top, left } = position;
      if (openAuthNumberForm) {
        // 비밀번호 찾기 페이지에서는 toastModalPositionTargetEl === null

        const newTop = toastModalPositionTargetEl
          ? toastModalPositionTargetEl.getClientRects()[0].top - 39 - 16
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
    // 타이머 시간을 경과한 경우, 이메일 작성란 다시 열기
    if (overTime) {
      setTimeout(() => {
        setOpenAuthNumberForm(false);
      }, 500);
    }
  }, [overTime]);

  useEffect(() => {
    if (openToastModal) {
      changeToastModalState();
    } else {
      setToastModalState(initialToastModalState);
    }
  }, [openToastModal]);
  return (
    <div className="email-verification">
      <section className="email-form">
        <InputForm
          additionOfLabel={additionOfLabel}
          id={INPUT_FORM_ID.email as InputFormIdType}
          data={email}
          setData={setEmail}
          disabled={openAuthNumberForm}
        />
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
            {!inFindPw && <div className="alert">이메일은 회원가입 후 변경하실 수 없어요.</div>}
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
            {overTime ? (
              <p className="msg-over-time">인증 시간이 지났습니다.</p>
            ) : authNumber.errorMsg ? (
              <div className="error-msg">
                <p>{authNumber.errorMsg}</p>
                <p>인증번호를 다시 확인해주세요.</p>
              </div>
            ) : (
              <div className="alert">
                <p>이메일이 수신되지 않는 경우, 입력하신 이메일이 정확한지 확인해 주세요.</p>
                <p>또는 스펨메일함과 메일함 용량을 확인해 주세요.</p>
              </div>
            )}
          </div>
        </section>
      )}
      {openAlertModal && (
        <AlertModal center={true} short={true} closeModal={onClickCloseBtnInAlertModal}>
          {alertModalChild}
        </AlertModal>
      )}
      {openToastModal && toastModalState.contents && (
        <ToastModal modalState={toastModalState} closeModal={() => setOpenToastModal(false)} />
      )}
    </div>
  );
};

export default EmailVerification;
