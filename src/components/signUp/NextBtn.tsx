import React from 'react';

export type NextBtnProps = {
  disableBtn: boolean;
  onClickNextBtn: () => void;
};
const NextBtn = ({ disableBtn, onClickNextBtn }: NextBtnProps) => {
  return (
    <div className="next-btn">
      <button type="button" disabled={disableBtn} onClick={onClickNextBtn}>
        다음
      </button>
    </div>
  );
};

export default React.memo(NextBtn);
