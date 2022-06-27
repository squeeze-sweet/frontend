import styles from './button.module.scss';

type Props = {
  onClick?: () => void;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  children: string;
};
export const Button = ({ htmlType = 'button', disabled = false, onClick, children }: Props) => {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} + ${disabled && styles.disabled}`}
    >
      {children}
    </button>
  );
};
