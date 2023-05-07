import React, { useState, Dispatch, SetStateAction } from 'react';

import './style.scss';

import FindPwContents from './component/FindPwContents';
import FindPwTopBar from './component/FindPwTopBar';

export type FindPwChildProps = {
  openEmailForm: boolean;
  setOpenEmailForm: Dispatch<SetStateAction<boolean>>;
  openAuthNumberForm: boolean;
  setOpenAuthNumberForm: Dispatch<SetStateAction<boolean>>;
};

const FindPw = () => {
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(true);
  const [openAuthNumberForm, setOpenAuthNumberForm] = useState<boolean>(false);
  const props = {
    openEmailForm: openEmailForm,
    setOpenEmailForm: setOpenEmailForm,
    openAuthNumberForm: openAuthNumberForm,
    setOpenAuthNumberForm: setOpenAuthNumberForm,
  };

  return (
    <div id="find-pw">
      <FindPwTopBar {...props} />
      <FindPwContents {...props} />
    </div>
  );
};

export default React.memo(FindPw);
