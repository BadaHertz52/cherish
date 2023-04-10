import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { DrawerScreen } from '@/layouts/DrawerScreen';
import MenuMoveSvg from '@/assets/svgs/menu-move.svg';

export type NoticePageProps = {
  handleBackButton: () => void;
};

export type Notice = {
  id: number;
  title: string;
  date: string;
};

export const NoticePage = ({ handleBackButton }: NoticePageProps) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    // TODO: API 연동
    setNotices(
      Array.from({ length: 4 }, (_, index) => ({
        id: index,
        title: '23년 2월 24일 본인인증 서비스 작업 안내',
        date: '2024.02.20',
      })),
    );
  }, []);

  return (
    <DrawerScreen title="공지사항" handleBackButton={handleBackButton} padding={false}>
      {/* TODO: 클릭 시 모달작업 하기 */}
      <div className={styles.noticePage}>
        {notices.map(notice => (
          <div className={styles.notice} key={notice.id}>
            <div className={styles.title}>{notice.title}</div>
            <div className={styles.date}>{notice.date}</div>
            <MenuMoveSvg />
          </div>
        ))}
      </div>
    </DrawerScreen>
  );
};
