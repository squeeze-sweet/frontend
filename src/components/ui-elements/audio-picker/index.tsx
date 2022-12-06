import styles from './audio-picker.module.scss';

type Props = {
  text: string;
};
export const AudioPicker = ({ text }: Props) => {
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
