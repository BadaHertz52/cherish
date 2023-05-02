import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';

import { onEmailVerification } from '@/api/auth/email';
import { EMAIL_API_RESULT_TYPE, EmailAPIResultType } from '@/api/auth/types';
import { AlertModal, InputForm, ToastModal, AuthNumberForm } from '@/components';
import { getToastModalPosition } from '@/components/Modals/functions';
import {
  INPUT_FORM_ID,
  InputDataType,
  InputFormIdType,
  initialInputData,
} from '@/pages/SignUp/signUpTypes';

import './style.scss';
import { ToastModalType } from '../Modals/modalTypes';

type EmailVerificationProps = {
  additionOfLabel?: string; // InputForm의 additionOfLabel
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
  email: InputDataType;
  setEmail: Dispatch<SetStateAction<InputDataType>>;
  openAuthNumberForm: boolean;
  setOpenAuthNumberForm: Dispatch<SetStateAction<boolean>>;
  toastModalPositionTargetEl: HTMLElement | null; // toastModal 위치,
  isInFindPw?: boolean; // 비밀번호 찾기 페이지에서 사용하는 지 여부
};
const EmailVerification = ({
  additionOfLabel,
  setDisableBtn,
  email,
  setEmail,
  openAuthNumberForm,
  setOpenAuthNumberForm,
  toastModalPositionTargetEl,
  isInFindPw,
}: EmailVerificationProps) => {
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  const [openToastModal, setOpenToastModal] = useState<boolean>(false);
  const initialToastModalState: ToastModalType = {
    contents: '',
    top: '0',
    left: '0',
  };
  const [toastModalState, setToastModalState] = useState<ToastModalType>(initialToastModalState);
  const [alertModalChild, setAlertModalChild] = useState<ReactNode>();
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
      const result: EmailAPIResultType = await onEmailVerification(
        { email: email.value },
        isInFindPw === true,
      );
      switch (result) {
        case EMAIL_API_RESULT_TYPE.duplicate:
          setEmail((prev: InputDataType) => ({
            ...prev,
            errorType: 'duplicatedEmail',
          }));
          break;
        case EMAIL_API_RESULT_TYPE.noUser:
          setEmail(prev => ({
            ...prev,
            errorType: 'notExistEmail',
          }));
        case EMAIL_API_RESULT_TYPE.pause:
          setOpenToastModal(false);
          setAlertModalChild(childOfModalForPause);
          setTimeout(() => {
            setOpenAlertModal(true);
          }, 100);
          break;
        case EMAIL_API_RESULT_TYPE.overSending:
          setOpenToastModal(false);
          setAlertModalChild(childOfModalForOverSending);
          setTimeout(() => {
            setOpenAlertModal(true);
          }, 100);
          break;
        case EMAIL_API_RESULT_TYPE.serverError:
          break;
        case EMAIL_API_RESULT_TYPE.success:
          setOpenToastModal(true);
          setTimeout(() => {
            setOpenTimer(true);
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
  const onClickCloseBtnInAlertModal = () => {
    setOpenAlertModal(false);
    setAlertModalChild('');
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
              disabled={!(email.value && !email.errorType)}
              type="button"
              onClick={onClickEmailBtn}
            >
              이메일 인증하기
            </button>
            {!isInFindPw && <div className="alert">이메일은 회원가입 후 변경하실 수 없어요.</div>}
          </>
        )}
      </section>
      {openAuthNumberForm && (
        <AuthNumberForm
          email={email}
          authNumber={authNumber}
          setAuthNumber={setAuthNumber}
          openTimer={openTimer}
          setOpenTimer={setOpenTimer}
          overTime={overTime}
          setOverTime={setOverTime}
          setOpenToastModal={setOpenToastModal}
          setDisableBtn={setDisableBtn}
          verifiedEmail={verifiedEmail}
          isInFindPw={isInFindPw}
        />
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
