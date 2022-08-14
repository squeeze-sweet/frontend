import styles from './radio.module.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  isDisabled?: boolean;
  isDefaultChecked?: boolean;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
};
export default ({
  isDefaultChecked = false,
  value,
  isDisabled = false,
  id,
  label,
  onChange,
  onClick,
}: Props) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        name='radio'
        type='radio'
        value={value}
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        onChange={onChange}
        onClick={onClick}
        className={styles.checkbox}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
