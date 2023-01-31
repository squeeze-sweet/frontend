import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui-elements/button';
import EmaleChosing from '../emale-chosing';
import { GeneralInfo } from '../general-info';
import useLang from '../../hooks/useLang';
import styles from './introduce-yourself.module.scss';

export default function IntroduceYourself() {
  const { tr, toggleLang } = useLang();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleChangeStep = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
      navigate('/how-it-works');
    }
  };

  const stepsData = [
    {
      heading: tr("welcome to the ''meet the peers'' tool!"),
      text: tr('the tool that will help you make a more personal introduction to the team'),
      component: <EmaleChosing onSubmit={handleChangeStep} />,
    },
    {
      heading: tr('and what’s your name?'),
      component: <GeneralInfo onSubmit={handleChangeStep} />,
    },
  ];

  return (
    <section className={styles['page-container']}>
      <div className={styles['header-container']}>
        <div></div>
        <div className={styles.text}>
          <h1>{stepsData[currentStep].heading}</h1>
          {stepsData[currentStep].text && (
            <p className={styles.description}>{stepsData[currentStep].text}</p>
          )}
        </div>
        <Button className={styles.button} onClick={toggleLang}>
          {tr('English')}
        </Button>
      </div>
      <div className={styles['content-container']}>{stepsData[currentStep].component}</div>
    </section>
  );
}
