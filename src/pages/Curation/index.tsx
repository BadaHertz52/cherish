import './index.scss';
import BackIcon from '../../assets/icons/back.png';
import SearchIcon from '../../assets/icons/search.png';
import MyPageIcon from '../../assets/icons/mypage.png';

const Curation = () => {
  return (
    <div className="curation">
      <div className="curation-title">
        <div className="curation-title-container">
          <div className="curation-title-container__back">
            <img src={BackIcon} alt="back-icon" />
          </div>
          <div className="curation-title-container__text">
            <h2>맞춤형 선물 추천</h2>
          </div>
          <div className="curation-title-container__icons">
            <img src={SearchIcon} alt="search-icon" />
            <img src={MyPageIcon} alt="mypage-icon" />
          </div>
        </div>
      </div>
      <div className="curation-main-text">
        <h2>
          내 정보와 상대방 정보를 입력하면
          <br />더 정확한 선물 큐레이션을 받을 수 있어요!
        </h2>
      </div>
    </div>
  );
};

export default Curation;
