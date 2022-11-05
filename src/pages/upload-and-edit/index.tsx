import { Button } from '../../components/ui-elements/button';
import { useNavigate } from 'react-router-dom';
import UploadNavigation from '../../components/navigation';
import { useStore } from '../../store';
import styles from './step.module.scss';
import Uploader from '../uploader';
import { Recorder } from '../recorder';
import VideoPlayer from '../../components/video-player';
import useLang from '../../hooks/useLang';
import { useState } from 'react';

export default function UploadAndEdit() {
  const { tr } = useLang();
  const navitage = useNavigate();
  const {
    currentFragmentName,
    filenames,
    currentStepData,
    currentStepData: { fragmentStartTime, fragmentFinishTime, videoPreviewSrc },
    setCurrentStepData,
    updateStepsData,
    resetStepData,
    setCurrentFragmentName,
    switchCurrentStep,
    stepsData,
  } = useStore(state => ({
    currentFragmentName: state.currentFragmentName,
    filenames: state.filenames,
    currentStepData: state.currentStepData,
    setCurrentStepData: state.setCurrentStepData,
    updateStepsData: state.updateStepsData,
    resetStepData: state.resetStepData,
    setCurrentFragmentName: state.setCurrentFragmentName,
    switchCurrentStep: state.switchCurrentStep,
    stepsData: state.stepsData,
  }));

  const [inputType, setInputType] = useState<'upload' | 'record'>('upload');
  const [error, setError] = useState('');

  const resetVideoPreviewSrs = () => {
    setCurrentStepData({ ...currentStepData, videoPreviewSrc: '' });
    resetStepData(currentFragmentName, currentStepData);
  };

  const setStartTime = (time: number) => {
    setCurrentStepData({ ...currentStepData, fragmentStartTime: time });
  };

  const setFinishTime = (time: number) => {
    setCurrentStepData({ ...currentStepData, fragmentFinishTime: time });
  };

  const handleSaveData = () => {
    updateStepsData(currentFragmentName, currentStepData);
    if (currentFragmentName !== filenames[filenames.length - 1]) {
      navigateToNextStep();
    } else navigateToAudioChoosing();
  };

  const clearValue = () => {
    setCurrentStepData({
      videoPreviewSrc: '',
      fragmentData: '',
      fragmentStartTime: 0,
      fragmentFinishTime: 0,
    });
  };

  const isFragmentReady = () => {
    const { videoPreviewSrc, fragmentData, fragmentFinishTime } = currentStepData;
    return videoPreviewSrc && fragmentData && fragmentFinishTime && !error;
  };

  const navigateToNextStep = () => {
    setCurrentFragmentName(filenames[filenames.indexOf(currentFragmentName) + 1]);
    switchCurrentStep(filenames[filenames.indexOf(currentFragmentName) + 1]);
  };

  const navigateToAudioChoosing = () => {
    let isValid = true;
    filenames.forEach((filename: string, index) => {
      if (index === filenames.length) {
        if (
          !(
            Boolean(stepsData[filename].fragmentData) &&
            Boolean(stepsData[filename].fragmentFinishTime) &&
            Boolean(stepsData[filename].videoPreviewSrc)
          )
        ) {
          isValid = false;
        }
      }
    });
    if (isValid) {
      navitage('../add-music');
    }
  };
  return (
    <section className={styles.page}>
      <UploadNavigation />
      <section className={styles.container}>
        <div className={styles.header}>
          <h1>{currentFragmentName}</h1>
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              onClick={() => {
                setInputType('record');
                clearValue();
              }}
            >
              {Boolean(videoPreviewSrc)
                ? tr('record another video with a web camera')
                : tr('record with a web camera')}
            </Button>
            <Button
              className={styles.button}
              onClick={() => {
                setInputType('upload');
                clearValue();
              }}
            >
              {Boolean(videoPreviewSrc) ? tr('upload another video') : tr('upload video')}
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          {inputType === 'upload' && !videoPreviewSrc && <Uploader />}
          {inputType === 'record' && !videoPreviewSrc && <Recorder />}

          {videoPreviewSrc && (
            <VideoPlayer
              setError={setError}
              clearValue={clearValue}
              videoPreviewSrc={videoPreviewSrc}
              resetVideoPreviewSrs={resetVideoPreviewSrs}
              startTime={fragmentStartTime}
              setStartTime={setStartTime}
              finishTime={fragmentFinishTime}
              setFinishTime={setFinishTime}
            />
          )}
          <p className={styles.error}>{error}</p>
        </div>
        <div className={styles.bottomButtons}>
          <Button className={styles.submit} onClick={handleSaveData} disabled={!isFragmentReady()}>
            {tr('Next')}
          </Button>
        </div>
      </section>
    </section>
  );
}
