import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui-elements/input';
import cn from 'classnames';
import styles from './admin-controlls.module.scss';
import { Button } from '../../components/ui-elements/button';
import { audios } from './mock/audios';
import deleteIcon from '../../assets/icons/delete.svg';

const steps = ['users', 'questions', 'audios', 'video backgrounds'];

export default function AdminControlls() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState('users');

  const handleTabClick = (text: string) => {
    console.log(text);

    setCurrentStep(text);
  };

  //audios
  const [playingAudioName, setPlayingAudioName] = useState('');
  console.log('playingAudioName', playingAudioName);

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
        {currentStep === 'audios' && (
          <>
            {audios?.map(({ name, link }, index) => (
              <>
                <AudioPlayer
                  link={link}
                  name={name}
                  currentName={playingAudioName}
                  setCurrentName={setPlayingAudioName}
                />
              </>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

function AudioPlayer({ link, name, currentName, setCurrentName }: any) {
  const audioRef = useRef<any>();
  const handleClick = () => {
    if (currentName === name) {
      setCurrentName('');
      return;
    }
    setCurrentName(name);
  };

  useEffect(() => {
    if (currentName === name) {
      audioRef?.current.play();
    } else {
      audioRef?.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentName]);

  return (
    <section className={styles.audioPlayer}>
      <audio src={link} className={styles.player} ref={audioRef} />
      <div className={styles.leftGroup}>
        <div
          id='play'
          className={cn(styles.play, { [styles.stop]: currentName === name })}
          onClick={handleClick}
        />
        {name}
      </div>
      <img src={deleteIcon} className={styles.deleteIcon} />
    </section>
  );
}
