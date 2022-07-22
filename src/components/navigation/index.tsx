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

  const handleFinish: any = () => {
    let isValid = true;
    filenames.map((filename: string) => {
      if (
        !(
          Boolean(stepsData[filename].fragmentData) &&
          Boolean(stepsData[filename].fragmentFinishTime) &&
          Boolean(stepsData[filename].videoPreviewSrc)
        )
      ) {
        console.log(
          'условие',
          Boolean(stepsData[filename].fragmentData) &&
            Boolean(stepsData[filename].fragmentFinishTime) &&
            Boolean(stepsData[filename].videoPreviewSrc),
        );

        isValid = false;
      }
      console.log(
        'validation',
        Boolean(stepsData[filename].fragmentData),
        Boolean(stepsData[filename].fragmentFinishTime),
        Boolean(stepsData[filename].videoPreviewSrc),
      );
    });
    console.log('isValid', isValid);
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
      <p className={cn(styles.link)} onClick={handleFinish}>
        Finish
      </p>
    </section>
  );
}
