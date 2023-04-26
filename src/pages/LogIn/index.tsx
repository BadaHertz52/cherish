import { TouchEvent, ChangeEvent, useState, useEffect } from 'react';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './style.scss';
import { LOG_IN_API_ITEM_KEY, onLogIn } from '@/api/auth/logIn';
import { LogInAPIParams } from '@/api/auth/types';
import { AlertModal, BtnShowPw, CheckBox } from '@/components';
import { REGEX } from '@/components/InputForm';

export const XSSCheck = (str: string, level?: number) => {
  if (!level || level == 0) {
    str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, '');
  } else if (level == 1) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
  }
  return str;
};
const LogIn = () => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [hiddenPw, setHiddenPw] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [keepLogIn, setKeepLogin] = useState<boolean>(false);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);

  const INPUT_TARGET = {
    email: 'email',
    pw: 'pw',
  } as const;
  type InputTargetType = keyof typeof INPUT_TARGET;
  const handleTouchOfLink = (event: TouchEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target?.classList.toggle('on');
  };
  const handleChangeOfValue = (event: ChangeEvent<HTMLInputElement>, target: InputTargetType) => {
    const value = XSSCheck(event.target.value);
    if (error) {
      setError(false);
    }
    if (target === INPUT_TARGET.email) {
      setEmail(value);
    } else {
      setPw(value);
    }
  };
  const handleClickRemoveBtn = () => {
    setEmail('');
  };
  const handleChangeOfKeep = () => {
    setKeepLogin(!keepLogIn);
  };
  const checkRegex = () => {
    return REGEX.email.test(email) && REGEX.pw.test(pw);
  };
  const sendLogInData = async () => {
    const data: LogInAPIParams = { email: email, password: pw };
    const result = await onLogIn(data);
    if (result.success) {
      //자동 로그인 여부를 localStorage에 저장해 ,  나중에 사이트 방문 시 로그인 자동 여부를 판별할 수 있도록 함
      if (keepLogIn) {
        localStorage.setItem(LOG_IN_API_ITEM_KEY.keepLogIn, 'true');
      }
    } else {
      setError(true);
    }
  };
  const handleClickLogInBtn = () => {
    if (checkRegex()) {
      setError(false);
      sendLogInData();
    } else {
      setError(true);
    }
  };
  const closeModal = () => {
    setOpenAlertModal(false);
    sessionStorage.removeItem(LOG_IN_API_ITEM_KEY.reLogIn);
  };
  useEffect(() => {
    localStorage.getItem(LOG_IN_API_ITEM_KEY.keepLogIn) &&
      localStorage.removeItem(LOG_IN_API_ITEM_KEY.keepLogIn);
    sessionStorage.getItem(LOG_IN_API_ITEM_KEY.logIn) &&
      sessionStorage.removeItem(LOG_IN_API_ITEM_KEY.logIn);
    if (sessionStorage.getItem(LOG_IN_API_ITEM_KEY.reLogIn)) {
      setOpenAlertModal(true);
    }
  }, []);

  return (
    <div id="log-in">
      <div className="inner">
        <h1 className="logo">LOG IN</h1>
        <h3>지금부터 체리슈와 선물을 고르러 가요!</h3>
        <div className="log-in__data">
          <div className="log-in__data__email">
            <input
              value={email}
              type="text"
              placeholder="이메일을 입력해주세요"
              onChange={event => handleChangeOfValue(event, INPUT_TARGET.email)}
            />
            <button type="button" title="btn-remove-email" onClick={handleClickRemoveBtn}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
          <div className="log-in__data__pw">
            <input
              value={pw}
              type={!hiddenPw ? 'text' : 'password'}
              placeholder="비밀번호을 입력해주세요"
              onChange={event => handleChangeOfValue(event, INPUT_TARGET.pw)}
            />
            <BtnShowPw hiddenPw={hiddenPw} setHiddenPw={setHiddenPw} />
          </div>
        </div>
        <div className="log-in__not-data">
          {error && (
            <div className="error-msg">
              이메일 또는 비밀번호를 잘못 입력했어요. 입력하신 내용을 다시 확인해주세요.
            </div>
          )}
          <div className="log-in__util">
            <div className="log-in__util__keep">
              <CheckBox
                id="checkboxKeep"
                name="autoLogIn"
                isChecked={() => keepLogIn}
                label="자동 로그인 하기"
                onChange={handleChangeOfKeep}
              />
            </div>
            <div className="log-in__util__find">
              {/* [todo] 비밀번호찾기 path 설정 */}
              <Link
                to={'/findpw'}
                className="link-find-pw"
                onTouchStart={event => handleTouchOfLink(event)}
                onTouchEnd={event => handleTouchOfLink(event)}
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </div>
        <button type="button" className="btn-log-in" onClick={handleClickLogInBtn}>
          로그인
        </button>
        <Link to={'/signup'} className="link-sign-up">
          <div>간편가입</div>
        </Link>
        <div className="banner">
          <div>
            {sessionStorage.getItem(LOG_IN_API_ITEM_KEY.reLogIn)
              ? '다시 로그인 해주세요.'
              : '결제정보 입력 없이 1분만에 회원가입하세요!'}
          </div>
        </div>
      </div>
      {openAlertModal && (
        <AlertModal center={true} short={true} closeModal={closeModal}>
          <div className="log-in__expired">
            <p>로그인이 만료 되었어요. </p>
            <p>다시 로그인 해주세요!</p>
          </div>
        </AlertModal>
      )}
    </div>
  );
};

export default LogIn;
