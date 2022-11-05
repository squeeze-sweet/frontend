import { useNavigate } from 'react-router-dom';
import yandexDiskApi from '../../services/api/api-yandex-disk';
import { useStore } from '../../store';
import styles from './filenames-setting.module.scss';
import { Button } from '../../components/ui-elements/button';
import { useEffect, useRef, useState } from 'react';
import audioApi from '../../services/api/admin';
import useLang from '../../hooks/useLang';
import AudioPlayer from '../../components/audio';

const musics = ['Energetic', 'Calm', 'Uplifting'];

export default function AddMusic() {
  const [filesInfo, setFilesInfo] = useState<any[]>([]);
  const [audios, setAudios] = useState<any>([]);
  const [playingAudioName, setPlayingAudioName] = useState('');

  const navigate = useNavigate();
  const getMusicLink = useStore(state => state.getMusicLink);
  const setPreloaderText = useStore(state => state.setPreloaderText);
  const { tr } = useLang();

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

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // @ts-ignore: Unreachable code error
    //TODO обратобать отсутствие ввода
    getMusicLink(Array.from(e.target).filter((target: any) => target.checked === true)[0].value);
    if (Array.from(e.target).filter((target: any) => target.checked === true)[0]) {
      navigate('../ready');
    }
  };

  useEffect(() => {
    setPreloaderText('downloading audios');
    const getFilesInfo = async () => {
      const {
        data: {
          _embedded: { items },
        },
      } = await yandexDiskApi.getFilesInfo('editor/music/');
      setFilesInfo(items);
    };
    getFilesInfo();
    setPreloaderText('');
  }, []);

  console.log('filesInfo', filesInfo);

  const itemsRef = useRef<any[]>([]);

  return (
    <section className={styles['page-container']}>
      <div className={styles['header-container']}>
        <div></div>
        <div className={styles.text}>
          <h1>{tr('Select the mood')}</h1>

          <p className={styles.description}>
            {tr('this music will be in the background of your video')}
          </p>
        </div>
        <Button className={styles.button}>{tr('Next')}</Button>
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
            />
          ))}
          {/* {filesInfo?.map(({ name, file }, index) => (
            <div className={styles.select}>
              <Radio
                id={String(index)}
                label={`${name}`}
                key={index}
                value={file}
                onClick={() => {
                  setChosenMusicLink(file);
                }}
                onPlayClick={() => {
                  itemsRef?.current.length && itemsRef?.current[index].play();
                }}
                file={file}
              />
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
}
