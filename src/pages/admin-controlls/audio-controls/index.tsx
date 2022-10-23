import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './audio-controlls.module.scss';
import { audios } from '../mock/audios';
import deleteIcon from '../../../assets/icons/delete.svg';
import audioApi from '../../../services/api/admin';
import { Button } from '../../../components/ui-elements/button';
const steps = ['users', 'questions', 'audios', 'video backgrounds'];
import UploadAudio from '../upload-audio-controls';
import Modal from '../../../components/ui-elements/modal/modal';

export default function AudioControlls() {
  useEffect(() => {
    audioApi.getAudioList();
  }, []);

  //audios
  const [playingAudioName, setPlayingAudioName] = useState('');
  const [isUploadActive, setIsAploadActive] = useState(true);

  return (
    <section className={styles.audios}>
      <Button>add audio</Button>
      {audios?.map(({ name, link }, index) => (
        <AudioPlayer
          link={link}
          name={name}
          currentName={playingAudioName}
          setCurrentName={setPlayingAudioName}
        />
      ))}
      {isUploadActive && (
        <Modal
          handleModalClose={() => {
            setIsAploadActive(false);
          }}
        >
          <UploadAudio />
        </Modal>
      )}
    </section>
  );
}

function AudioPlayer({ link, name, currentName, setCurrentName }: any) {
  const audioRef = useRef<any>();
  const handleClick = () => {
    if (currentName === name) {
      setCurrentName('');
      return;
    }
    setCurrentName(name);
  };

  useEffect(() => {
    if (currentName === name) {
      audioRef?.current.play();
    } else {
      audioRef?.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentName]);

  return (
    <section className={styles.audioPlayer}>
      <audio src={link} className={styles.player} ref={audioRef} />
      <div className={styles.leftGroup}>
        <div
          id='play'
          className={cn(styles.play, { [styles.stop]: currentName === name })}
          onClick={handleClick}
        />
        {name}
      </div>
      <img src={deleteIcon} className={styles.deleteIcon} />
    </section>
  );
}
