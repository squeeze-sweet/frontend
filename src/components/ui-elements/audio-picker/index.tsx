import styles from './audio-picker.module.scss';

type Props = {
  text: string;
  /*   onClick?: () => void;
  htmlType?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  children: string; */
};
export const AudioPicker = ({
  /*   htmlType = 'button',
  disabled = false,
  onClick,
  children, */
  text,
}: Props) => {
  const handleClick = () => {};

  return (
    <button onClick={handleClick} type='button' className={styles.button}>
      <div className={styles['icon-container']}>
        <div className={styles['icon']}></div>
      </div>
      {text}
    </button>
  );
};
