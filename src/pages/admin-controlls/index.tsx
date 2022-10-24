import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './admin-controlls.module.scss';
import { audios } from './mock/audios';
import deleteIcon from '../../assets/icons/delete.svg';
import audioApi from '../../services/api/admin';
import UploadAudio from './upload-audio-controls';
import Modal from '../../components/ui-elements/modal/modal';
import AudioControlls from './audio-controls';
import UserControls from './user-controls';
const steps = ['users', 'questions', 'audios', 'video backgrounds'];

export default function AdminControlls() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('users');

  const handleTabClick = (text: string) => {
    console.log(text);

    setCurrentStep(text);
  };

  useEffect(() => {
    audioApi.getAudioList();
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        {steps.map((step: string) => (
          <div
            onClick={() => handleTabClick(step)}
            className={cn(styles.tab, { [styles.activeTab]: currentStep === step })}
          >
            {step}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        {currentStep === 'audios' && <AudioControlls />}{' '}
        {currentStep === 'users' && <UserControls />}
      </div>
    </section>
  );
}
