import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import Picker from 'react-mobile-picker';

import { BirthDateType, BirthStateType } from '../signUpTypes';
import '../styles/datePicker.scss';
type DatePickerProps = {
  birth: BirthStateType;
  setBirth: Dispatch<SetStateAction<BirthStateType>>;
};
const DatePicker = ({ birth, setBirth }: DatePickerProps) => {
  const ARR_YEAR = getArr(1920, 2010);
  const ARR_MONTH = getArr(1, 12);
  const ARR_DATE_THIRTY_ONE = getDateArr('1', '31');
  const ARR_DATE_THIRTY = getDateArr('1', '30');
  type OptionGroupType = {
    year: string[];
    month: string[];
    date: string[];
  };
  const [optionGroups, setOptionGroups] = useState<OptionGroupType>({
    year: ARR_YEAR,
    month: ARR_MONTH,
    date: ARR_DATE_THIRTY_ONE,
  });

  const initialData: BirthDateType = {
    year: '2010',
    month: '01',
    date: '01',
  };
  const [birthDate, setBirthDate] = useState<BirthDateType>(
    birth.value ? birth.value : initialData,
  );
  function getArr(startNumber: number, lastNumber: number) {
    const arr = [];
    for (let i = startNumber; i <= lastNumber; i++) {
      arr.push(i < 10 ? `0${i}` : i.toString());
    }
    return arr;
  }
  function getDateArr(year: string, month: string) {
    const lastDate = new Date(Number(year), Number(month), 0).getDate();
    return getArr(1, lastDate);
  }
  const changeOptionGroups = (year: string, month: string) => {
    const thirtyTarget = ['4', '6', '9', '11'];
    setOptionGroups(prev => ({
      ...prev,
      date:
        month === '2'
          ? getDateArr(year, month)
          : thirtyTarget.includes(month)
          ? ARR_DATE_THIRTY
          : ARR_DATE_THIRTY_ONE,
    }));
  };
  const changeBirth = (target: string, value: string) => {
    setBirthDate(prev => ({
      ...prev,
      [target]: value,
    }));
    setBirth({
      value: {
        ...birthDate,
        [target]: value,
      },
      errorType: undefined,
    });
  };
  const handleChange = (name: string, value: string) => {
    switch (name) {
      case 'year':
        changeOptionGroups(value, birthDate.month);
        break;
      case 'month':
        changeOptionGroups(birthDate.year, value);
        break;
      default:
        break;
    }
    changeBirth(name, value);
  };
  useEffect(() => {
    setBirth({
      value: initialData,
      errorType: undefined,
    });
  }, []);
  return (
    <div id="date-picker">
      <Picker valueGroups={birthDate} optionGroups={optionGroups} onChange={handleChange} />
    </div>
  );
};
export default DatePicker;
