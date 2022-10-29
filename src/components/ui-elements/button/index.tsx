import cn from 'classnames';
import styles from './button.module.scss';

type Props = {
  onClick?: () => void;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
  children: any;
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
      className={cn(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.reversed]: reversed,
      })}
    >
      {children}
    </button>
  );
};
