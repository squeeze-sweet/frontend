import { useStore } from '../../store';
import cn from 'classnames';
import checkIcon from '../../assets/icons/check.svg';
import styles from './navigation.module.scss';

export default function Navigation() {
  const { filenames, currentFragmentName, setCurrentFragmentName, switchCurrentStep, stepsData } =
    useStore(state => ({
      filenames: state.filenames,
      stepsData: state.stepsData,
      currentFragmentName: state.currentFragmentName,
      setCurrentFragmentName: state.setCurrentFragmentName,
      switchCurrentStep: state.switchCurrentStep,
    }));

  const handleClick = (filename: string) => {
    setCurrentFragmentName(filename);
    switchCurrentStep(filename);
  };
  return (
    <section className={styles.container}>
      {filenames.map((filename: string, index: number) => (
        <>
          <p
            className={cn(styles.link, { [styles.active]: currentFragmentName === filename })}
            onClick={() => {
              handleClick(filename);
            }}
          >
            {`${index + 1}. ${filename}`}
            {stepsData[`${filename}`].videoPreviewSrc && <img src={checkIcon} />}
          </p>
        </>
      ))}
    </section>
  );
}
