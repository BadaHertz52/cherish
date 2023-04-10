import { memo } from 'react';

import BackIcon from '@/assets/svgs/back-button.svg';
import MyPageIcon from '@/assets/svgs/mypage.svg';
import SearchIcon from '@/assets/svgs/search.svg';

import Accordion from './components/Accordion';
import styles from './style.module.scss';

const Curation = () => {
  return (
    <div className={styles.curation}>
      <div className={styles.curationTitle}>
        <div className={styles.curationTitleContainer}>
          <div className={styles.curationTitleContainerBack}>
            <BackIcon />
          </div>
          <div className={styles.curationTitleContainerText}>
            <h2>맞춤형 선물 추천</h2>
          </div>
          <div className={styles.curationTitleContainerIcons}>
            <SearchIcon />
            <MyPageIcon />
          </div>
        </div>
      </div>
      <div className={styles.curationMainText}>
        <h2>
          내 정보와 상대방 정보를 입력하면
          <br />더 정확한 선물 큐레이션을 받을 수 있어요!
        </h2>
      </div>
      <Accordion />
    </div>
  );
};

export default memo(Curation);
