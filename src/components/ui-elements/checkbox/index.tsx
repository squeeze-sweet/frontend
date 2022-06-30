import styles from './checkbox.module.scss';

type Props = {
  id: string;
  label: string;
  isDisabled?: boolean;
  isDefaultChecked?: boolean;
};
export const Checkbox = ({ isDefaultChecked = false, isDisabled = false, id, label }: Props) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        type='checkbox'
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        className={styles.checkbox}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
