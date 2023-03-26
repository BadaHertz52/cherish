import { faCheck, faCircleXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/login.scss';
import CheckBox from '../components/CheckBox';

export const XSSCheck = (str: string, level: undefined | number) => {
  if (level == undefined || level == 0) {
    str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, '');
  } else if (level != undefined && level == 1) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
  }
  return str;
};
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [showPw, setShowPw] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [keepLogin, setKeepLogin] = useState<boolean>(false);
  enum inputTarget {
    email = 'email',
    pw = 'pw',
  }
  type InputTargetType = keyof typeof inputTarget;
  const onChange = (event: ChangeEvent<HTMLInputElement>, target: InputTargetType) => {
    const value = XSSCheck(event.target.value, undefined);
    if (target === 'email') {
      setEmail(value);
    } else {
      setPw(value);
    }
  };
  const onClickRemoveBtn = () => {
    setEmail('');
  };
  const onChangeKeep = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | null;
    target !== null && setKeepLogin(target.checked);
  };
  const onClickLogInBtn = async () => {
    const data = { email: email, pw: pw };
    // data 서버에 전송
    /*
    try {
      const result =await(await fetch('/', {
        method:"POST",
        headers :{},
        body :JSON.stringify(data)
      })).json();
      //result 값에 따라 login / 오류 메세지 
      if(login === success){
        navigate('/main');
        if(keepLogin){
          //로그인 유지 
        }
      }
      else{setError(true)}
      
    } catch (error) {
      // error message 
    }
    */
  };
  const onClickSignUpBtn = () => {
    navigate('/singup');
  };
  return (
    <div id="login">
      <div className="inner">
        <h1 className="logo">LOG IN</h1>
        <h2>로그인을 하시면 다양한 혜택을 누릴 수 있습니다.</h2>
        <div className="login__data">
          <div className="login__data__email">
            <input
              value={email}
              type="text"
              placeholder="이메일"
              onChange={event => onChange(event, 'email')}
            />
            <button type="button" title="btn-remove-email" onClick={onClickRemoveBtn}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
          <div className="login__data__pw">
            <input
              value={pw}
              type={showPw ? 'text' : 'password'}
              placeholder="비밀번호"
              onChange={event => onChange(event, 'pw')}
            />
            <button
              type="button"
              className={showPw ? 'btn on' : 'btn'}
              title="button that show pw as text"
              onClick={() => setShowPw(prev => !prev)}
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
        <div className="login__util">
          <div className="login__util__keep">
            <CheckBox
              id="checkboxKeep"
              name="autoLogIn"
              label="로그인 유지"
              onChange={onChangeKeep}
            />
          </div>
          <div className="login__util__find">
            <Link to={'/비밀번호찾기'}>비밀번호 찾기</Link>
          </div>
        </div>
        <div className="error-msg">
          {error && (
            <>
              <p>이메일 또는 비밀번호를 잘못 입력했어요.</p>
              <p>입력하신 내용을 다시 확인해주세요.</p>
            </>
          )}
        </div>
        <button type="button" className="btn-login" onClick={onClickLogInBtn}>
          로그인
        </button>
        <button type="button" className="btn-signup" onClick={onClickSignUpBtn}>
          간편가입
        </button>
        <div className="banner">결제정보 입력 없이 1분만에 회원가입하세요!</div>
      </div>
    </div>
  );
};

export default LogIn;
