import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './audio-controlls.module.scss';
import deleteIcon from '../../../assets/icons/delete.svg';
import audioApi from '../../../services/api/admin';
import { Button } from '../../../components/ui-elements/button';
const steps = ['users', 'questions', 'audios', 'video backgrounds'];
import crossIcon from '../../../assets/icons/cross-white.svg';
import UploadAudio from '../upload-audio-controls';
import Modal from '../../../components/ui-elements/modal/modal';

export default function AudioControlls() {
  const [audios, setAudios] = useState<any>([]);
  useEffect(() => {
    getAudios();
  }, []);

  const getAudios = async () => {
    try {
      const { data } = await audioApi.getAudios();
      console.log('data', data);
      setAudios(data);
    } catch (error) {}
  };
  //audios
  const [playingAudioName, setPlayingAudioName] = useState('');
  const [isUploadActive, setIsAploadActive] = useState(false);

  const handleOpenModal = () => {
    setIsAploadActive(true);
  };

  const handleCloseModal = () => {
    setIsAploadActive(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await audioApi.deleteFile(id);
    } catch (error) {
      console.error();
    }
    getAudios();
  };

  const handleAdd = async (file: any) => {
    try {
      await audioApi.postFile(file);
    } catch (error) {
      console.error();
    }
    getAudios();
  };

  return (
    <section className={styles.audios}>
      <Button onClick={handleOpenModal}>
        <div className={styles.adderContent}>
          <p>add audio</p>
          <img src={crossIcon} className={styles.cross}></img>
        </div>
      </Button>
      {audios?.map(({ id, name, link }: any) => (
        <AudioPlayer
          id={id}
          link={''}
          name={name}
          currentName={playingAudioName}
          setCurrentName={setPlayingAudioName}
          handleDelete={handleDelete}
        />
      ))}
      {isUploadActive && (
        <Modal
          handleModalClose={() => {
            setIsAploadActive(false);
          }}
        >
          <UploadAudio handleCloseModal={handleCloseModal} handleAddAudio={handleAdd} />
        </Modal>
      )}
    </section>
  );
}

function AudioPlayer({
  id,
  link = '/calm.mp3',
  name,
  currentName,
  setCurrentName,
  handleDelete,
}: any) {
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

  const onDelete = async () => {
    handleDelete(id);
  };

  return (
    <section className={styles.audioPlayer}>
      <audio src={'/calm.mp3'} className={styles.player} ref={audioRef} />
      <div className={styles.leftGroup}>
        <div
          id='play'
          className={cn(styles.play, { [styles.stop]: currentName === name })}
          onClick={handleClick}
        />
        {name}
      </div>
      <img src={deleteIcon} className={styles.deleteIcon} onClick={onDelete} />
    </section>
  );
}