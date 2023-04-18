import { useState } from 'react';

import Header from '@/components/common/Header';

import styles from './style.module.scss';

export type DrawerScreenProps = {
  children: JSX.Element;
  title: string;
  padding?: boolean;
  handleBackButton: () => void;
};

export const DrawerScreen = ({
  children,
  title,
  handleBackButton,
  padding = true,
}: DrawerScreenProps) => {
  const [closing, setClosing] = useState(false);

  const handleBackButtonClick = () => {
    setClosing(true);
    setTimeout(() => {
      handleBackButton();
    }, 300);
  };

  return (
    <div className={`${styles.drawerScreen} ${closing ? styles.closing : ''}`}>
      <Header title={title} handleBackButton={handleBackButtonClick} />
      <section className={`${padding ? styles.padding : ''}`}>{children}</section>
    </div>
  );
};
