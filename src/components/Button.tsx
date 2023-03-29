import React, { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';
import axios from 'axios';

//ButtonProps는 ButtonHTMLAttributes<HTMLButtonElement> 상속받았기 때문에
// button 태그에 대한 모든 속성을 props 사용 가능. 이외의 속성은 따로 선언.

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  onClickAction?: () => void; // 버튼 클릭 시 실행될 함수
  style?: CSSProperties; //button의 style지정.
};

const Button = ({ onClickAction, style, ...rest }: Props) => {
  const handleButtonClick = () => {
    if (onClickAction) {
      onClickAction();
    }
  };

  return <button {...rest} onClick={handleButtonClick} style={style}></button>;
};

export default Button;
