import { forwardRef, useImperativeHandle, useState } from 'react';

import Header from '@/components/common/Header';

import styles from './style.module.scss';

export type DrawerScreenProps = {
  children: JSX.Element;
  title: string;
  padding?: boolean;
  handleBackButton: () => void;
};

export type DrawerScreenForward = {
  handleBackButtonClick: () => void;
};

export const DrawerScreen = forwardRef(
  ({ title, children, padding = true, handleBackButton }: DrawerScreenProps, ref) => {
    useImperativeHandle(ref, () => ({
      // 부모 컴포넌트에서 사용할 함수를 선언
      handleBackButtonClick,
    }));

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
  },
);

DrawerScreen.displayName = 'DrawerScreen';
