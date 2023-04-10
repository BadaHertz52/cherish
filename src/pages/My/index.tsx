import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Header from '@/components/common/Header';
import MenuMoveSvg from '@/assets/svgs/menu-move.svg';
import AlertModal from '@/components/Modals/AlertModal';

export type MenuProps = {
  title: string;
  handleClick: () => void;
  emphasized?: boolean;
};

const Menu = ({ title, handleClick, emphasized }: MenuProps) => {
  return (
    <div className={`${styles.menu} ${emphasized && styles.emphasized}`} onClick={handleClick}>
      <span>{title}</span>
      <MenuMoveSvg />
    </div>
  );
};

const MyPage = () => {
  const noticeMenus = [
    {
      title: '공지사항',
      handleClick: () => {},
    },
    {
      title: '문의하기',
      handleClick: () => {
        setShowInquiry(true);
      },
    },
    {
      title: '이용약관',
      handleClick: () => {},
    },
    {
      title: '개인정보보호정책',
      handleClick: () => {},
    },
  ];

  const memberInfoManageMenus = [
    {
      title: '회원정보 수정',
      handleClick: () => {},
    },
    {
      title: '로그아웃',
      handleClick: () => {},
    },
    {
      title: '회원탈퇴',
      handleClick: () => {},
    },
  ];

  const [tags, setTags] = useState<string[]>([]);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    setTags(['직장인', '10대', '여성']);
  }, []);

  return (
    <div className={styles.myPage}>
      <Header title="마이페이지" handleBackButton={() => {}} />
      <section>
        <h2>닉네임님 안녕하세요!</h2>
        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </section>
      <hr />
      <section>
        <Menu title="최근 본 상품" handleClick={() => {}} emphasized />
      </section>
      <hr />
      <section>
        <h2>안내</h2>
        {noticeMenus.map(menu => (
          <Menu key={menu.title} title={menu.title} handleClick={menu.handleClick} />
        ))}
      </section>
      <hr />
      <section>
        <h2>회원정보 관리</h2>
        {memberInfoManageMenus.map(menu => (
          <Menu key={menu.title} title={menu.title} handleClick={menu.handleClick} />
        ))}
      </section>
      {showInquiry && (
        // TODO: 이메일 주소 변경
        <AlertModal center short={false} closeModal={() => setShowInquiry(false)}>
          <div className={styles.inquiry}>1111@naver.com으로 문의해 주세요.</div>
        </AlertModal>
      )}
    </div>
  );
};

export default MyPage;
