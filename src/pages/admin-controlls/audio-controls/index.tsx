import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './audio-controlls.module.scss';
import audioApi from '../../../services/api/admin';
import { Button } from '../../../components/ui-elements/button';
import crossIcon from '../../../assets/icons/cross-white.svg';
import UploadAudio from '../upload-audio-controls';
import Modal from '../../../components/ui-elements/modal/modal';
import AudioPlayer from '../../../components/audio';
import { useStore } from '../../../store';

export default function AudioControlls() {
  const { audios, getAudios } = useStore(({ audios, getAudios }) => ({ audios, getAudios }));
  const { email, password } = useStore(({ email, password }) => ({
    email,
    password,
  }));

  useEffect(() => {
    getAudios();
  }, []);

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
      await audioApi.deleteFile(id, email, password);
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
      <Button onClick={handleOpenModal} className={styles.button}>
        <div className={styles.adderContent}>
          <p>add audio</p>
          <img src={crossIcon} className={styles.cross}></img>
        </div>
      </Button>
      {audios?.map(({ id, name, link }: any) => (
        <AudioPlayer
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
            setIsAploadActive(false);
          }}
        >
          <UploadAudio handleCloseModal={handleCloseModal} handleAddAudio={handleAdd} />
        </Modal>
      )}
    </section>
  );
}
