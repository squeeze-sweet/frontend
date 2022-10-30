import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui-elements/button';
import useLang from '../../hooks/useLang';
import stepsImg from '../../assets/images/questions.png';
import devicesImg from '../../assets/images/devices.png';
import vibeImg from '../../assets/images/vibe.png';
import previewImg from '../../assets/images/preview.png';
import styles from './introduce-yourself.module.scss';

export default function HowItWorks() {
  const { tr } = useLang();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const stepsData = [
    {
      component: (
        <div className={styles.page1}>
          <div className={styles.page1TextContainer}>
            <p className={styles.page1Text}>
              {tr(
                'We felt a little disconnected while working remotely and found it hard to meet new people through emails.',
              )}
            </p>
            <p className={styles.page1Text}>
              {tr(
                'This tool is designed to improve comfort and enhance collaboration among all team members. Wherever you are.',
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      component: (
        <div className={styles.page1}>
          <img src={stepsImg} className={styles.step2Img} />
          <div className={styles.page2TextContainer}>
            <h2 className={styles.page2Heading}>{tr('step 1 - select questions')}</h2>
            <p className={styles.page2Text}>
              {tr('You will have around 15-30 seconds to answer them.')}
            </p>
          </div>
        </div>
      ),
    },
    {
      component: (
        <div className={styles.page1}>
          <img src={devicesImg} className={styles.step2Img} />
          <div className={styles.page2TextContainer}>
            <h2 className={styles.page2Heading}>{tr('step 2 - pick your method')}</h2>
            <p className={styles.page2Text}>
              {tr(
                'We have two options - record a video with a webcam or upload it. If you select to upload it, you can use your phone to record it.',
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      component: (
        <div className={styles.page1}>
          <img src={vibeImg} className={styles.step2Img} />
          <div className={styles.page2TextContainer}>
            <h2 className={styles.page2Heading}>{tr('step 3 - select the mood')}</h2>
            <p className={styles.page2Text}>
              {tr(
                'Last step is to select the music. Find one that can desribe your character, whether you are active or calm, rocky or jazzy.',
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      component: (
        <div className={styles.page1}>
          <div className={styles.page5Container}>
            <img src={previewImg} className={styles.step5Img} />
            <h2 className={styles.page5Heading}>{tr('watch an example that we’ve made')}</h2>
          </div>
        </div>
      ),
    },
  ];

  const handleForward = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
      navigate('/select-questions');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className={styles['page-container']}>
      <div className={styles['content-container']}>{stepsData[currentStep].component}</div>
      <div className={styles.buttons}>
        {currentStep > 0 && (
          <div className={styles.button}>
            <Button reversed onClick={handleBack}>
              {tr('Back')}
            </Button>
          </div>
        )}
        <div className={styles.button}>
          <Button onClick={handleForward}>{tr('Next')}</Button>
        </div>
      </div>
    </section>
  );
}
