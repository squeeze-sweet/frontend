import { useRef, useState } from 'react';
import cn from 'classnames';
import styles from './radio.module.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  isDisabled?: boolean;
  isDefaultChecked?: boolean;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  onPlayClick: () => void;
  file: any;
};
export default ({
  isDefaultChecked = false,
  value,
  isDisabled = false,
  id,
  label,
  onChange,
  onClick,
  onPlayClick,
  file,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = () => {
    if (isPlaying) {
      itemRef?.current && itemRef?.current.pause();
      itemRef?.current && (itemRef.current.currentTime = 0);
    } else {
      itemRef?.current && itemRef?.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const itemRef = useRef<any>();
  return (
    <div className={styles.container}>
      <div
        id='play'
        className={cn(styles.play, { [styles.stop]: isPlaying })}
        onClick={handleClick}
      />

      <audio ref={itemRef} /*  controls */ src={file} className={styles.player} />

      <input
        id={id}
        name='radio'
        type='radio'
        value={value}
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        onChange={onChange}
        onClick={onClick}
        className={styles.checkbox}
      />

      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
