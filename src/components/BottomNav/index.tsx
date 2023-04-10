import React, { useRef, useState, useEffect } from 'react';
import '../FontAwesome';
import './BottomNav.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faPlus, faMedal } from '@fortawesome/free-solid-svg-icons';
import throttle from 'lodash/throttle';

const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = React.useState(0);

  // 각 페이지별 상태를 나타내는 변수
  const tags = [
    { id: 1, icon: faHome, title: '홈', link: '/first' },
    { id: 2, icon: faCompass, title: '큐레이션', link: '/second' },
    { id: 3, icon: faPlus, title: '카테고리', link: '/third' },
    { id: 4, icon: faMedal, title: '저장목록', link: '/fourth' },
  ];

  // 스크롤 감지를 관리하는 state
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  // 이전 y값과 현재 y값을 빼서 state를 변경시켜주는 로직.
  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  const throttleScroll = throttle(handleScroll, 50);
  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll);
    return () => documentRef.current.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  return (
    /* 하단 네비게이션 최상위 태그 */
    <nav className={hide ? 'wrapper-hidden' : 'wrapper'}>
      {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
      {tags.map(tag => (
        <Link
          key={tag.id}
          to={tag.link}
          className="nav-link"
          onClick={() => {
            setActiveNav(tag.id);
          }}
        >
          <div>
            <FontAwesomeIcon
              icon={tag.icon}
              className={activeNav === tag.id ? 'nav-item active' : 'nav-item'}
            />
            <div className={activeNav === tag.id ? 'nav-title active' : 'nav-title'}>
              {tag.title}
            </div>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
