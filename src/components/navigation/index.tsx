import { useStore } from '../../store';
import cn from 'classnames';
import checkIcon from '../../assets/icons/check.svg';
import styles from './navigation.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navitage = useNavigate();
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
    filenames.forEach((filename: string) => {
      if (
        !(
          Boolean(stepsData[filename].fragmentData) &&
          Boolean(stepsData[filename].fragmentFinishTime) &&
          Boolean(stepsData[filename].videoPreviewSrc)
        )
      ) {
        isValid = false;
      }
    });
    console.log(isValid);

    if (isValid) {
      navitage('../finish');
    }
  };

  return (
    <section className={styles.container}>
      {filenames.map((filename: string, index: number) => (
        <div key={index}>
          <p
            className={cn(styles.link, { [styles.active]: currentFragmentName === filename })}
            onClick={() => {
              handleClick(filename);
            }}
          >
            {`${index + 1}. ${filename}`}
            {stepsData[`${filename}`].videoPreviewSrc && <img src={checkIcon} />}
          </p>
        </div>
      ))}
    </section>
  );
}
