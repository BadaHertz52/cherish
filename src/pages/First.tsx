import axios from 'axios';
import { useEffect } from 'react';

const first = () => {
  useEffect(() => {
    axios
      .get('https://back.cherishu.kro.kr/public/member/is-member?email=asdf')
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return (
    <div>
      <h1>첫번째 화면입니다.</h1>
      <h1>검색창</h1>
      <h1>상품사진</h1>
    </div>
  );
};
export default first;
