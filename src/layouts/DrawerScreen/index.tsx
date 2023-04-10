import styles from './style.module.scss';
import { useState } from 'react';
import Header from '@/components/common/Header';

export type DrawerScreenProps = {
  children: JSX.Element;
  title: string;
  handleBackButton: () => void;
};

export const DrawerScreen = ({ children, handleBackButton }: DrawerScreenProps) => {
  const [closing, setClosing] = useState(false);

  const handleBackButtonClick = () => {
    setClosing(true);
    setTimeout(() => {
      handleBackButton();
    }, 300);
  };

  return (
    <div className={`${styles.drawerScreen} ${closing ? styles.closing : ''}`}>
      <Header title="최근 본 상품" handleBackButton={handleBackButtonClick} />
      <section>{children}</section>
    </div>
  );
};
