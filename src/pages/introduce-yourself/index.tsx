import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmaleChosing from '../emale-chosing';
import { GeneralInfo } from '../general-info';
import styles from './introduce-yourself.module.scss';

const stepsData = [
  {
    heading: 'welcome to the meet the peer tool!',
    text: 'the tool that will help you make a more personal introduction to the team',
    component: <EmaleChosing />,
  },
  {
    heading: 'and what’s your name?',
    text: '',
    component: <GeneralInfo />,
  },
];

export default function IntroduceYourself() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleChangeStep = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
      navigate('/filenames-setting');
    }
  };

  const stepsData = [
    {
      heading: 'welcome to the meet the peer tool!',
      text: 'the tool that will help you make a more personal introduction to the team',
      component: <EmaleChosing onSubmit={handleChangeStep} />,
    },
    {
      heading: 'and what’s your name?',
      text: '',
      component: <GeneralInfo onSubmit={handleChangeStep} />,
    },
  ];

  return (
    <section className={styles['page-container']}>
      <div className={styles['header-container']}>
        <div className={styles.text}>
          <h1>{stepsData[currentStep].heading}</h1>
        </div>
      </div>
      <div className={styles['content-container']}>{stepsData[currentStep].component}</div>
    </section>
  );
}
