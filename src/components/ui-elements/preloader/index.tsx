import { useStore } from '../../../store';
import styles from './preloader.module.scss';

export default function Preloader() {
  const preloaderText = useStore(state => state.preloaderText);

  return preloaderText ? (
    <div className={styles['preloader-container']}>
      <div className={styles['lds-dual-ring']} />
      <p className={styles.text}>{preloaderText}</p>
    </div>
  ) : null;
}
