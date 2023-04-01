import React, { useState } from 'react';
const DatePickerContainer = () => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  const min = new Date(`${todayYear - 79},0,1`);
  const max = today;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateConfig = [
    {
      type: 'year',
      format: 'YYYY',
      caption: 'year',
      step: 1,
    },
    {
      type: 'month',
      format: 'MM',
      caption: 'month',
      step: 1,
    },
    {
      type: 'date',
      format: 'DD',
      caption: 'date',
      step: 1,
    },
  ];

  const onChange = () => {};
  const onSelect = () => {};
  return <div id="date-picker-container"></div>;
};
export default React.memo(DatePickerContainer);
