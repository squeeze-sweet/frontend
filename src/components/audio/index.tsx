import { useRef, useEffect } from 'react';
import cn from 'classnames';
import deleteIcon from '../../assets/icons/delete.svg';
import styles from './audio.module.scss';

function AudioPlayer({
  id,
  link,
  name,
  currentName,
  setCurrentName,
  handleDelete,
  chosenAudioId,
  setChosenAudioId,
}: any) {
  const audioRef = useRef<any>();

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (currentName === name) {
      setCurrentName('');
      return;
    }
    setCurrentName(name);
  };

  const handleChoseAudio = () => {
    setChosenAudioId(id);
  };

  useEffect(() => {
    if (currentName === name) {
      audioRef?.current.play();
    } else {
      audioRef?.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentName]);

  const onDelete = async () => {
    handleDelete(id);
  };

  return (
    <section
      className={cn(styles.audioPlayer, { [styles.active]: chosenAudioId === id })}
      onClick={handleChoseAudio}
    >
      <audio src={link} className={styles.player} ref={audioRef} />
      <div className={styles.leftGroup}>
        <div
          id='play'
          className={cn(styles.play, { [styles.stop]: currentName === name })}
          onClick={handleClick}
        />
        {name}
      </div>
      {handleDelete && <img src={deleteIcon} className={styles.deleteIcon} onClick={onDelete} />}
    </section>
  );
}

export default AudioPlayer;
