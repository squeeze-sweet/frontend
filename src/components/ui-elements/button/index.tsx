import cn from 'classnames';
import styles from './button.module.scss';

type Props = {
  onClick?: () => void;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
  children: string;
};
export const Button = ({
  htmlType = 'button',
  disabled = false,
  onClick,
  className,
  children,
}: Props) => {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
      className={cn(styles.button, className, { [styles.disabled]: disabled })}
    >
      {children}
    </button>
  );
};
