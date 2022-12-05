import { useEffect, useRef, useState } from 'react';
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
  const itemRef = useRef<any>();
  const inputRef = useRef<any>();

  const handleClick = () => {
    /*     if (isPlaying) {
      itemRef?.current && itemRef?.current.pause();
      itemRef?.current && (itemRef.current.currentTime = 0);
    } else {
      itemRef?.current && itemRef?.current.play();
    }
    setIsPlaying(!isPlaying); */
  };

  useEffect(() => {
    if (inputRef?.current?.checked) {
      itemRef?.current && itemRef?.current.play();
      setIsPlaying(true);
    } else {
      itemRef?.current && itemRef?.current.pause();
      itemRef?.current && (itemRef.current.currentTime = 0);
      setIsPlaying(false);
    }
  }, [inputRef?.current?.checked]);

  return (
    <div className={styles.container}>
      <audio ref={itemRef} /*  controls */ src={file} className={styles.player} />

      <input
        ref={inputRef}
        id={id}
        name='radio'
        type='radio'
        value={value}
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        onChange={() => {}}
        onClick={onClick}
        className={styles.checkbox}
      />

      <label className={styles.label} htmlFor={id}>
        <div
          id='play'
          className={cn(styles.play, { [styles.stop]: isPlaying })}
          onClick={handleClick}
        />

        {label}
      </label>
    </div>
  );
};
