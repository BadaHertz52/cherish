import { useState } from 'react';

import { withdrawal } from '@/api/auth/member';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import { DrawerScreen } from '@/layouts/DrawerScreen';

import styles from './style.module.scss';

export type WithdrawalPageProps = {
  handleBackButton: () => void;
};

export const WithdrawalPage = ({ handleBackButton }: WithdrawalPageProps) => {
  const [checked, setChecked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = ({ target }: { target: HTMLInputElement }) => {
    const ischecked = target.checked;
    setChecked(ischecked);
  };

  const handleWithdrawal = async () => {
    await withdrawal();
    window.location.assign('/');
  };

  return (
    <DrawerScreen title="이용약관" handleBackButton={handleBackButton}>
      <div className={styles.withdrawalPage}>
        <h2>서비스 탈퇴 전 유의사항</h2>
        <ul>
          <li>1. 서비스 탈퇴 시 회원 전용 서비스 이용이 불가하며, 회원 데이터는 일괄 삭제돼요.</li>
          <li>
            2.서비스 탈퇴신청 후 서비스 탈퇴가 완료되면 해당 계정에 대한 모든 정보는 삭제되며 복원이
            불가능한 점 유의해 주세요
          </li>
        </ul>
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          사실을 확인했어요
        </label>
        <div className={styles.warning}>체크하지 않으시면 탈퇴할 수 없어요</div>
        <button disabled={!checked} onClick={() => setShowConfirmModal(true)}>
          계정 영구삭제
        </button>
        {showConfirmModal && (
          <ConfirmModal
            yesBtn={{ text: '네', otherFn: () => handleWithdrawal() }}
            noBtn={{ text: '아니오' }}
            closeModal={() => setShowConfirmModal(false)}
          >
            <div>탈퇴 후에는 계정 정보를 복구할 수 없어요. 정말로 계정을 삭제하시겠어요?</div>
          </ConfirmModal>
        )}
      </div>
    </DrawerScreen>
  );
};
