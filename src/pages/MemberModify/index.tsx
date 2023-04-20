import { useState } from 'react';

import { DrawerScreen } from '@/layouts/DrawerScreen';

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

  const [nickname, setNickname] = useState('');
  const [job, setJob] = useState('학생');

  return (
    <DrawerScreen title="회원정보 수정" handleBackButton={handleBackButton}>
      <div className={styles.memberModify}>
        <ul>
          <li>
            <CustomInput
              title="변경할 닉네임을 입력해 주세요."
              type="text"
              placeholder="기존 닉네임"
              value={nickname}
              setValue={setNickname}
              errorMessage="hi"
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
              value={nickname}
              setValue={setNickname}
              errorMessage="8~12자 영문 + 숫자를 포함하여 입력해 주세요."
            />
          </li>
          <li>
            <CustomInput
              title="새 비밀번호를 입력해 주세요."
              type="password"
              placeholder="새 비밀번호"
              value={nickname}
              setValue={setNickname}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
          </li>
        </ul>
      </div>
    </DrawerScreen>
  );
};
