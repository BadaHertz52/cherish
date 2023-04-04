import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
type TimerProps = {
  setOverTime: Dispatch<SetStateAction<boolean>>;
  setOpenTimer: Dispatch<SetStateAction<boolean>>;
};
const Timer = ({ setOverTime, setOpenTimer }: TimerProps) => {
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setOverTime(true);
          setOpenTimer(false);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);
  return (
    <div id="timer">
      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default React.memo(Timer);
