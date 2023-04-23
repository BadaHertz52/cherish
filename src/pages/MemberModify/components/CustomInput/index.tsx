import EyeslashSvg from '@/assets/svgs/eyeslash.svg';
import PasswordCheckSvg from '@/assets/svgs/password-check.svg';

import styles from './style.module.scss';

export type CustomInputProps = {
  title?: string;
  type: 'text' | 'password';
  placeholder?: string;
  errorMessage?: string;
  value: string;
  setValue: (value: string) => void;
};

export const CustomInput = ({
  title,
  value,
  type,
  setValue,
  placeholder,
  errorMessage,
}: CustomInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.customInput}>
      <div className={styles.title}>{title}</div>
      <div className={styles.inputForm}>
        <input type={type} placeholder={placeholder} value={value} onChange={handleInputChange} />
        {type === 'password' && (
          <div className={`${styles.icon} ${errorMessage && styles.error}`}>
            <PasswordCheckSvg />
          </div>
        )}
      </div>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};
