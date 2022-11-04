import { ChangeEvent } from 'react';
import styles from './input.module.scss';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value?: string;
  placeholder: string;
  label: string;
  defaultValue?: string;
  error?: string;
};

export const Input = ({ value, onChange, id, placeholder, label, defaultValue, error }: Props) => {
  return (
    <label className={styles.container}>
      <p>{label}</p>
      <input
        id={id}
        type='text'
        className={styles.input}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
      />
      <p className={styles.error}>{error}</p>
    </label>
  );
};
