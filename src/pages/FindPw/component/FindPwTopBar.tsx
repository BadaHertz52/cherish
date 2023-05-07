import { useNavigate } from 'react-router-dom';

import BackBtn from '@/assets/svgs/back-button.svg';

import { FindPwChildProps } from '..';
import styles from '../style.module.scss';

const FindPwTopBar = ({
  openEmailForm,
  setOpenEmailForm,
  openAuthNumberForm,
  setOpenAuthNumberForm,
}: FindPwChildProps) => {
  const navigate = useNavigate();

  const onClickPrevBtn = () => {
    if (openEmailForm) {
      openAuthNumberForm ? setOpenAuthNumberForm(false) : navigate(-1);
    } else {
      setOpenEmailForm(true);
      setOpenAuthNumberForm(true);
    }
  };
  return (
    <div className={styles.topBar}>
      <button className="btn-prev" onClick={onClickPrevBtn} title="btn-prev" type="button">
        <BackBtn />
      </button>
      <h2>비밀번호 찾기</h2>
    </div>
  );
};

export default FindPwTopBar;
