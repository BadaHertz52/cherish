import BackIcon from '@/assets/svgs/back-button.svg';
import MyPageIcon from '@/assets/svgs/mypage.svg';
import SearchIcon from '@/assets/svgs/search.svg';

import styles from './style.module.scss';

const PresentRecommendation = () => {
  const handleGoBack = () => {
    location.href = '/curation';
  };
  return (
    <div className={styles.curation}>
      <div className={styles.curationTitle}>
        <div className={styles.curationTitleContainer}>
          <div className={styles.curationTitleContainerBack} onClick={handleGoBack}>
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
    </div>
  );
};

export default PresentRecommendation;
