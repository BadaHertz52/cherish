import React, { useState, useEffect } from 'react';
import Picker from 'react-mobile-picker';

const DatePicker = () => {
  const getArr = (startNumber: number, lastNumber: number) => {
    let arr = [];
    for (let i = startNumber; i <= lastNumber; i++) {
      arr.push(i.toString());
    }
    return arr;
  };
  const getDateArr = (year: string, month: string) => {
    const lastDate = new Date(Number(year), Number(month), 0).getDate();
    return getArr(1, lastDate);
  };

  const yearArr = getArr(1920, 2010);
  const monthArr = getArr(1, 12);
  const initialDayArr = getDateArr('1', '31');
  const [year, setYear] = useState<string>('2010');
  const [month, setMonth] = useState<string>('1');
  type OptionGroupType = {
    year: string[];
    month: string[];
    date: string[];
  };
  const [optionGroups, setOptionGroups] = useState<OptionGroupType>({
    year: yearArr,
    month: monthArr,
    date: initialDayArr,
  });
  const changeOptionGroups = (year: string, month: string) => {
    console.log(year, month);
    setOptionGroups(prev => ({
      ...prev,
      date: getDateArr(year, month),
    }));
  };
  const initialValueGroups = {
    year: '2010',
    month: '1',
    date: '1',
  };
  const [value, setValue] = useState(initialValueGroups);
  const onChange = (name: string, value: string) => {
    switch (name) {
      case 'year':
        setYear(value);
        changeOptionGroups(value, month);
        setValue(prev => ({
          ...prev,
          year: value,
        }));
        break;
      case 'month':
        setMonth(value);
        changeOptionGroups(year, value);
        setValue(prev => ({
          ...prev,
          month: value,
        }));
      default:
        break;
    }
  };
  return (
    <div id="date-picker">
      <Picker valueGroups={value} optionGroups={optionGroups} onChange={onChange} />
    </div>
  );
};
export default DatePicker;
