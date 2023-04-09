import { memo } from 'react';
import styles from './style.module.scss';
import BackIcon from '../../assets/icons/back.png';
import SearchIcon from '../../assets/icons/search.png';
import MyPageIcon from '../../assets/icons/mypage.png';
import Accordion from './components/Accordion';

const Curation = () => {
  return (
    <div className={styles.curation}>
      <div className={styles.curationTitle}>
        <div className={styles.curationTitleContainer}>
          <div className={styles.curationTitleContainerBack}>
            <img src={BackIcon} alt="back-icon" />
          </div>
          <div className={styles.curationTitleContainerText}>
            <h2>맞춤형 선물 추천</h2>
          </div>
          <div className={styles.curationTitleContainerIcons}>
            <img src={SearchIcon} alt="search-icon" />
            <img src={MyPageIcon} alt="mypage-icon" />
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
