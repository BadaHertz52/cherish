import { useState } from 'react';

interface SearchBoxProps {
  onClick: (value: string) => void;
}

export default function SearchBox({ onClick }: SearchBoxProps): JSX.Element {
  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    onClick(value);
    setValue('');
  };
  return (
    <>
      <input type="text" placeholder="검색어를 입력해 주세요." value={value} onChange={onChange} />
      <button disabled={!value} onClick={handleClick}>
        <img src="/search.png" alt="search" />
      </button>
    </>
  );
}
