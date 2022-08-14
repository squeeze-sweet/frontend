import { useNavigate } from 'react-router-dom';
import yandexDiskApi from '../../services/api/api-yandex-disk';
import { useStore } from '../../store';
import Radio from '../../components/ui-elements/radio';
import styles from './filenames-setting.module.scss';
import { Button } from '../../components/ui-elements/button';
import { useEffect, useState } from 'react';

const musics = ['Energetic', 'Calm', 'Uplifting'];

export default function AddMusic() {
  const [filesInfo, setFilesInfo] = useState<any[]>([]);
  const [chosenMusicLink, setChosenMusicLink] = useState<any>(null);
  const navigate = useNavigate();
  const getMusicLink = useStore(state => state.getMusicLink);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // @ts-ignore: Unreachable code error
    //TODO обратобать отсутствие ввода
    getMusicLink(Array.from(e.target).filter((target: any) => target.checked === true)[0].value);
    if (Array.from(e.target).filter((target: any) => target.checked === true)[0]) {
      navigate('../ready');
    }
  };

  useEffect(() => {
    const getFilesInfo = async () => {
      const {
        data: {
          _embedded: { items },
        },
      } = await yandexDiskApi.getFilesInfo('editor/music/');
      setFilesInfo(items);
      console.log(items);
    };
    getFilesInfo();
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.checkboxes}>
        {/*         {musics.map((musicName, index) => (
          <Radio id={String(index)} label={`${musicName}`} key={index} value={musicName} />
        ))} */}
        {filesInfo?.map(({ name, file }, index) => (
          <div className={styles.select}>
            <audio controls src={file} className={styles.player}>
              audio
            </audio>
            <Radio
              id={String(index)}
              label={`${name}`}
              key={index}
              value={file}
              onClick={() => setChosenMusicLink(file)}
            />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Button htmlType='submit' disabled={!chosenMusicLink}>
          Next
        </Button>
      </div>
    </form>
  );
}
