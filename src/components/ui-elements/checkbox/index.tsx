import styles from './checkbox.module.scss';

type Props = {
  id: string;
  label: string;
  isDisabled?: boolean;
  isDefaultChecked?: boolean;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
export const Checkbox = ({
  isDefaultChecked = false,
  isDisabled = false,
  id,
  label,
  name,
  onChange,
}: Props) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        name={name}
        type='checkbox'
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        className={styles.checkbox}
        onChange={onChange}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
