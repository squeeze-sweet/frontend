import styles from './checkbox.module.scss';

type Props = {
  id: string;
  label: string;
  isDisabled?: boolean;
  isDefaultChecked?: boolean;
  name: string;
};
export const Checkbox = ({
  isDefaultChecked = false,
  isDisabled = false,
  id,
  label,
  name,
}: Props) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        name={name}
        type='radio'
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
