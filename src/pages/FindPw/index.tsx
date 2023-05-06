import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import './style.scss';

import BackBtn from '@/assets/svgs/back-button.svg';

import FindPwContents from './component/FindPwContents';
import styles from './style.module.scss';

const FindPw = () => {
  const navigate = useNavigate();
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(true);
  const [openAuthNumberForm, setOpenAuthNumberForm] = useState<boolean>(false);

  const onClickPrevBtn = () => {
    if (openEmailForm) {
      openAuthNumberForm ? setOpenAuthNumberForm(false) : navigate('-1');
    } else {
      setOpenEmailForm(true);
      setOpenAuthNumberForm(true);
    }
  };
  return (
    <div id="find-pw">
      <div className={styles.topBar}>
        <button className="btn-prev" onClick={onClickPrevBtn} title="btn-prev" type="button">
          <BackBtn />
        </button>
        <h2>비밀번호 찾기</h2>
      </div>
      <FindPwContents
        openEmailForm={openEmailForm}
        setOpenEmailForm={setOpenEmailForm}
        openAuthNumberForm={openAuthNumberForm}
        setOpenAuthNumberForm={setOpenAuthNumberForm}
      />
    </div>
  );
};

export default React.memo(FindPw);
