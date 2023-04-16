import styles from './style.module.scss';
import BackButtonSvg from '@/assets/svgs/back-button.svg';

export type HeaderProps = {
  title: string;
  handleBackButton: () => void;
};

const Header = ({ title, handleBackButton }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.backButton} onClick={handleBackButton}>
        <BackButtonSvg />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default Header;
