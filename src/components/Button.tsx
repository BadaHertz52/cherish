import { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';

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
