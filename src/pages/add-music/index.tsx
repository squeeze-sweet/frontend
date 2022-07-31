import { useNavigate } from 'react-router-dom';
import LayoutPage from '../../components/templates/form-page';
import { useStore } from '../../store';
import Radio from '../../components/ui-elements/radio';
import styles from './filenames-setting.module.scss';

const musics = ['Energetic', 'Calm', 'Uplifting'];

export default function AddMusic() {
  const getMusicLink = useStore(state => state.getMusicLink);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // @ts-ignore: Unreachable code error
    //TODO обратобать отсутствие ввода
    getMusicLink(Array.from(e.target).filter((target: any) => target.checked === true)[0].value);
  };

  return (
    <LayoutPage onSubmit={handleSubmit} buttonText='Continue'>
      <div className={styles.checkboxes}>
        {musics.map((musicName, index) => (
          <Radio id={String(index)} label={`${musicName}`} key={index} value={musicName} />
        ))}
      </div>
    </LayoutPage>
  );
}
