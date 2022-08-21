import cn from 'classnames';
import styles from './button.module.scss';

type Props = {
  onClick?: () => void;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
  children: string;
  reversed?: boolean;
};
export const Button = ({
  htmlType = 'button',
  disabled = false,
  onClick,
  className,
  children,
  reversed,
}: Props) => {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
      className={cn(styles.button, className, {
        [styles.disabled]: disabled,
        [styles.reversed]: reversed,
      })}
    >
      {children}
    </button>
  );
};
