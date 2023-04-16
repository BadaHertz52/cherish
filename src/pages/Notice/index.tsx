import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { DrawerScreen } from '@/layouts/DrawerScreen';
import MenuMoveSvg from '@/assets/svgs/menu-move.svg';
import AlertModal from '@/components/Modals/AlertModal';

export type NoticePageProps = {
  handleBackButton: () => void;
};

export type Notice = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export const NoticePage = ({ handleBackButton }: NoticePageProps) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    // TODO: API 연동, content 반환 타입 협의
    setNotices(
      Array.from({ length: 4 }, (_, index) => ({
        id: index,
        title: '23년 2월 24일 본인인증 서비스 작업 안내',
        content: `
          <div>안녕하세요.</div>
          <br>
          <div>
            본 이용약관은 크로키닷컴 주식회사(이하 "회사"라 합니다)가 운영하는
            “지그재그(ZIGZAG)” 서비스 (이하 "지그재그"라 합니다)와
            그 외 다양한 인터넷 웹사이트 및 응용프로그램(어플리케이션, 앱)인
            “지그재그 외 플랫폼” 서비스를 통해서 제공되는 전자상거래 관련
            서비스 및 기타 서비스(이하 “서비스”라 합니다)를 이용하는 자(이하 “이용자”라 합니다)
            사이의 권리, 의무, 기타 필요한 사항을 정함으로써 상호 이익을 도모하는 것을
            그 목적으로 합니다.
          </div>
        `,
        date: '2024.02.20',
      })),
    );
  }, []);

  return (
    <DrawerScreen title="공지사항" handleBackButton={handleBackButton} padding={false}>
      <div className={styles.noticePage}>
        {notices.map(notice => (
          <div className={styles.notice} key={notice.id}>
            <div className={styles.title}>{notice.title}</div>
            <div className={styles.date}>{notice.date}</div>
            <MenuMoveSvg onClick={() => setNotice(notice)} />
          </div>
        ))}
        {notice && (
          <AlertModal center={false} short={false} closeModal={() => setNotice(null)}>
            <h3 className={styles.noticeModalTitle}>{notice.title}</h3>
            <div className={styles.noticeModalDate}>{notice.date}</div>
            <main
              className={styles.noticeModalContent}
              dangerouslySetInnerHTML={{ __html: notice.content }}
            ></main>
          </AlertModal>
        )}
      </div>
    </DrawerScreen>
  );
};
