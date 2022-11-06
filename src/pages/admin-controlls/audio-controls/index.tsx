import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './audio-controlls.module.scss';
import audioApi from '../../../services/api/admin';
import { Button } from '../../../components/ui-elements/button';
import crossIcon from '../../../assets/icons/cross-white.svg';
import UploadAudio from '../upload-audio-controls';
import Modal from '../../../components/ui-elements/modal/modal';
import AudioPlayer from '../../../components/audio';

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
