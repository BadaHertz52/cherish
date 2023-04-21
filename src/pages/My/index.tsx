import { useEffect, useState } from 'react';

import MenuMoveSvg from '@/assets/svgs/menu-move.svg';
import AlertModal from '@/components/Modals/AlertModal';
import ConfirmModal from '@/components/Modals/ConfirmModal';
import { DrawerScreen } from '@/layouts/DrawerScreen';

import { MemberModifyPage } from '../MemberModify';
import { NoticePage } from '../Notice';
import { PrivacyPolicyPage } from '../PrivacyPolicy';
import { RecentlyViewProductPage } from '../RecentlyViewProduct';
import { TermsOfServicePage } from '../TermsOfService';
import { WithdrawalPage } from '../Withdrawal';

import styles from './style.module.scss';

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

export type MyPageProps = {
  handleBackButton: () => void;
};

const MyPage = ({ handleBackButton: handleCloseMyPage }: MyPageProps) => {
  const noticeMenus = [
    {
      title: '공지사항',
      handleClick: () => {
        setCurrentScreen(<NoticePage handleBackButton={handleBackButton} />);
      },
    },
    {
      title: '문의하기',
      handleClick: () => {
        setShowInquiry(true);
      },
    },
    {
      title: '이용약관',
      handleClick: () => {
        setCurrentScreen(<TermsOfServicePage handleBackButton={handleBackButton} />);
      },
    },
    {
      title: '개인정보보호정책',
      handleClick: () => {
        setCurrentScreen(<PrivacyPolicyPage handleBackButton={handleBackButton} />);
      },
    },
  ];

  const memberInfoManageMenus = [
    {
      title: '회원정보 수정',
      handleClick: () => {
        setCurrentScreen(<MemberModifyPage handleBackButton={handleBackButton} />);
      },
    },
    {
      title: '로그아웃',
      handleClick: () => setShowLogOutModal(true),
    },
    {
      title: '회원탈퇴',
      handleClick: () => setCurrentScreen(<WithdrawalPage handleBackButton={handleBackButton} />),
    },
  ];

  const [tags, setTags] = useState<string[]>([]);
  const [showInquiry, setShowInquiry] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<JSX.Element | null>(null);

  const handleBackButton = () => {
    setCurrentScreen(null);
  };

  const handleLogout = () => {
    // TODO: 로그아웃 API 연결
  };

  useEffect(() => {
    setTags(['직장인', '10대', '여성']);

    const body = document.querySelector('body');
    let overflowValue = '';

    if (body) {
      overflowValue = body.style.overflow;
      body.style.overflow = 'hidden';
    }

    return () => {
      if (body) {
        body.style.overflow = overflowValue;
      }
    };
  }, []);

  return (
    <DrawerScreen title="마이페이지" handleBackButton={handleCloseMyPage} padding={false}>
      <div className={styles.myPage}>
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
          <Menu
            title="최근 본 상품"
            handleClick={() =>
              setCurrentScreen(<RecentlyViewProductPage handleBackButton={handleBackButton} />)
            }
            emphasized
          />
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
        {showLogOutModal && (
          <ConfirmModal
            yesBtn={{ otherFn: handleLogout, text: '네' }}
            noBtn={{ text: '아니오' }}
            closeModal={() => setShowLogOutModal(false)}
          >
            <div>로그아웃 하시겠어요?</div>
          </ConfirmModal>
        )}
        {currentScreen}
      </div>
    </DrawerScreen>
  );
};

export default MyPage;
