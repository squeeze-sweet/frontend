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
import { useStore } from '../../../store';

export default function VideoControlls() {
  const [videos, setVideos] = useState<any>([]);
  const { email, password } = useStore(({ email, password }) => ({
    email,
    password,
  }));

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const { data } = await audioApi.getVideos(email, password);
      setVideos(data);
    } catch (error) {}
  };
  //audios
  const [playingAudioName, setPlayingAudioName] = useState('');
  const [isUploadActive, setIsUploadActive] = useState(false);

  const handleOpenModal = () => {
    setIsUploadActive(true);
  };

  const handleCloseModal = () => {
    setIsUploadActive(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await audioApi.deleteFile(id, email, password);
    } catch (error) {
      console.error(error);
    }
    getVideos();
  };

  const handleAdd = async (file: any) => {
    try {
      await audioApi.postFile(file, email, password);
    } catch (error) {
      console.error(error);
    }
    getVideos();
  };

  return (
    <section className={styles.audios}>
      <Button onClick={handleOpenModal} className={styles.button}>
        <div className={styles.adderContent}>
          <p>add video</p>
          <img src={crossIcon} className={styles.cross}></img>
        </div>
      </Button>
      {videos?.map(({ id, name, link }: any) => (
        <VideoPlayer
          id={id}
          link={link}
          name={name}
          currentName={playingAudioName}
          setCurrentName={setPlayingAudioName}
          handleDelete={handleDelete}
        />
      ))}
      {isUploadActive && (
        <Modal
          handleModalClose={() => {
            setIsUploadActive(false);
          }}
        >
          <UploadAudio
            handleCloseModal={handleCloseModal}
            handleAddAudio={handleAdd}
          />
        </Modal>
      )}
    </section>
  );
}

function VideoPlayer({
  id,
  link,
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
    <section className={styles.videoPlayer}>
      <video src={link} className={styles.player} ref={audioRef} />
      <div className={styles.controlls}>
        <div className={styles.leftGroup}>
          <div
            id="play"
            className={cn(styles.play, { [styles.stop]: currentName === name })}
            onClick={handleClick}
          />
          {name}
        </div>
        <img
          src={deleteIcon}
          className={styles.deleteIcon}
          onClick={onDelete}
        />
      </div>
    </section>
  );
}
