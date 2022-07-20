import styles from './button.module.scss';
import cn from 'classnames';

type Props = {
  onClick?: () => void;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  children?: string;
  className?: string;
  isCapturing: boolean;
};
export const VideoButton = ({
  htmlType = 'button',
  onClick,
  className,
  isCapturing = false,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={cn(styles['button-container'], className, { [styles.square]: isCapturing })}
    >
      {!false && (
        <div className={cn(styles['button-border'], { [styles.square]: isCapturing })}>
          <div className={cn(styles.button, { [styles.square]: isCapturing })} />
        </div>
      )}
    </div>
  );
};
