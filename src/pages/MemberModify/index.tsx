import { useRef, useState } from 'react';

import { modifyMemberInformation } from '@/api/auth/member';
import { ConfirmModal } from '@/components';
import { REGEX } from '@/functions/regex';
import { DrawerScreen, DrawerScreenForward } from '@/layouts/DrawerScreen';
import { ERROR_MSG } from '@/pages/SignUp/signUpTypes';

import { CustomInput } from './components/CustomInput';
import { DropdownBox } from './components/DropdownBox';
import styles from './style.module.scss';

export type TermsOfServicePageProps = {
  handleBackButton: () => void;
};

export const MemberModifyPage = ({ handleBackButton }: TermsOfServicePageProps) => {
  const JOBS = [
    '전문직',
    '관리/사무직',
    '판매/서비스직',
    '노동/생산직',
    '자영업',
    '학생',
    '전업주부',
    '무직',
    '기타',
  ];

  const drawerScreenRef = useRef<DrawerScreenForward>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [nickname, setNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [nextPasswordConfirm, setNextPasswordConfirm] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    nickname: '',
    currentPassword: '',
    nextPassword: '',
    nextPasswordConfirm: '',
  });

  // TODO: 회원정보 불러오는 API 연결
  const [job, setJob] = useState('학생');

  const handleCancel = () => {
    if (drawerScreenRef.current) {
      drawerScreenRef.current.handleBackButtonClick();
    }
  };

  const validate = () => {
    const newErrorMessages = {
      nickname: REGEX.nickName.test(nickname) ? '' : ERROR_MSG.invalidNickName,
      currentPassword: REGEX.pw.test(currentPassword) ? '' : ERROR_MSG.invalidPw,
      nextPassword: REGEX.pw.test(nextPassword) ? '' : ERROR_MSG.invalidPw,
      nextPasswordConfirm: nextPassword === nextPasswordConfirm ? '' : ERROR_MSG.invalidConfirmPw,
    };

    setErrorMessages(newErrorMessages);

    return Object.values(newErrorMessages).every(errorMessage => errorMessage === '');
  };

  const handleModify = () => {
    if (!validate()) {
      // TODO: API 형식 문의 및 후속 작업 정리
      modifyMemberInformation({
        nickName: nickname,
        jobName: job,
        currentPassword,
        nextPassword,
      });
    }
  };

  return (
    <DrawerScreen title="회원정보 수정" handleBackButton={handleBackButton} ref={drawerScreenRef}>
      <>
        <div className={styles.memberModify}>
          <ul>
            <li>
              <CustomInput
                title="변경할 닉네임을 입력해 주세요."
                type="text"
                placeholder="기존 닉네임"
                value={nickname}
                setValue={setNickname}
                errorMessage={errorMessages.nickname}
              />
            </li>
            <li>
              <div className={styles.itemTitle}>변경할 직업을 입력해 주세요.</div>
              <DropdownBox value={job} setValue={setJob} items={JOBS} />
            </li>
            <li>
              <CustomInput
                title="비밀번호 변경을 위해 기존 비밀번호를 입력해 주세요."
                type="password"
                placeholder="8~12자 영문 + 숫자를 포함하여 입력해 주세요."
                value={currentPassword}
                setValue={setCurrentPassword}
                errorMessage={errorMessages.currentPassword}
              />
            </li>
            <li>
              <CustomInput
                title="새 비밀번호를 입력해 주세요."
                type="password"
                placeholder="새 비밀번호"
                value={nextPassword}
                setValue={setNextPassword}
                errorMessage={errorMessages.nextPassword}
              />
            </li>
            <li>
              <CustomInput
                title="새 비밀번호를 한번 더 입력해 주세요."
                type="password"
                placeholder="비밀번호 확인"
                value={nextPasswordConfirm}
                setValue={setNextPasswordConfirm}
                errorMessage={errorMessages.nextPasswordConfirm}
              />
            </li>
          </ul>
          <div className={styles.buttons}>
            <button onClick={() => setShowConfirmModal(true)}>취소</button>
            <button onClick={handleModify}>회원정보 저장</button>
          </div>
        </div>
        {showConfirmModal && (
          <ConfirmModal
            closeModal={() => setShowConfirmModal(false)}
            yesBtn={{ text: '네', otherFn: handleCancel }}
            noBtn={{ text: '아니오' }}
          >
            회원정보 수정을 취소하시겠어요?
          </ConfirmModal>
        )}
      </>
    </DrawerScreen>
  );
};
