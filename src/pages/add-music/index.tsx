import { useNavigate } from 'react-router-dom';
import styles from './filenames-setting.module.scss';
import { Button } from '../../components/ui-elements/button';
import { useEffect, useState } from 'react';
import audioApi from '../../services/api/admin';
import useLang from '../../hooks/useLang';
import AudioPlayer from '../../components/audio';
import { useStore } from '../../store';

export default function AddMusic() {
  const [playingAudioName, setPlayingAudioName] = useState('');
  const [chosenAudioId, setChosenAudioId] = useState('');
  const [error, setError] = useState('');
  const { audios, getAudios } = useStore(({ audios, getAudios }) => ({ audios, getAudios }));

  console.log('chosenAudioId', chosenAudioId);

  const navigate = useNavigate();

  const { tr } = useLang();

  useEffect(() => {
    getAudios();
  }, []);

  const handleAudioSelect = (id: string) => {
    setChosenAudioId(id);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // @ts-ignore: Unreachable code error
    if (chosenAudioId) {
      console.log('success');
    }
    setError(tr('please select audio'));
    navigate('/ready');
  };

  return (
    <form className={styles['page-container']} onSubmit={handleSubmit}>
      <div className={styles['header-container']}>
        <div></div>
        <div className={styles.text}>
          <h1>{tr('Select the mood')}</h1>

          <p className={styles.description}>
            {tr('this music will be in the background of your video')}
          </p>
        </div>
        <div>
          <Button className={styles.button} htmlType='submit'>
            {tr('Next')}
          </Button>
          {error && <p>{error}</p>}
        </div>
      </div>
      <div className={styles['content-container']}>
        <div className={styles.checkboxes}>
          {audios?.map(({ id, name, link }: any) => (
            <AudioPlayer
              id={id}
              link={link}
              name={name}
              currentName={playingAudioName}
              setCurrentName={setPlayingAudioName}
              chosenAudioId={chosenAudioId}
              setChosenAudioId={handleAudioSelect}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
