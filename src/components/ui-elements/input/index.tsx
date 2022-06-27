import styles from './input.module.scss';

type Props = {
  onChange?: (e: any) => void;
  id: string;
  placeholder: string;
  label: string;
  error?: string;
};

export const Input = ({ onChange, id, placeholder, label, error }: Props) => {
  return (
    <label className={styles.container}>
      {label}
      <input
        id={id}
        type='text'
        className={styles.input}
        onChange={onChange}
        placeholder={placeholder}
      />
      <p className={styles.error}>{error}</p>
    </label>
  );
};
