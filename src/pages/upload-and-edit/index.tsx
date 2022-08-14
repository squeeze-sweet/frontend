import { Button } from '../../components/ui-elements/button';
import { Link, useNavigate } from 'react-router-dom';
import UploadNavigation from '../../components/navigation';
import { useStore } from '../../store';
import styles from './step.module.scss';
import Uploader from '../uploader';
import { Recorder } from '../recorder';
/* import Preview from '../preview'; */
import VideoPlayer from '../../components/video-player';
import { useState } from 'react';
import { indexOf } from 'lodash';

export default function UploadAndEdit() {
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
      ...currentStepData,
      videoPreviewSrc: '',
      fragmentData: '',
      fragmentStartTime: 0,
      fragmentFinishTime: 0,
    });
  };

  const isFragmentReady = () => {
    const { videoPreviewSrc, fragmentData, fragmentFinishTime } = currentStepData;
    return videoPreviewSrc && fragmentData && fragmentFinishTime;
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
              {Boolean(videoPreviewSrc) ? 'record another video with webcam' : 'record with webcam'}
            </Button>
            <Button
              className={styles.button}
              onClick={() => {
                setInputType('upload');
                clearValue();
              }}
            >
              {Boolean(videoPreviewSrc) ? 'upload another video from device' : 'upload from device'}
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          {inputType === 'upload' && !videoPreviewSrc && <Uploader />}
          {inputType === 'record' && !videoPreviewSrc && <Recorder />}

          {videoPreviewSrc && (
            <VideoPlayer
              videoPreviewSrc={videoPreviewSrc}
              resetVideoPreviewSrs={resetVideoPreviewSrs}
              startTime={fragmentStartTime}
              setStartTime={setStartTime}
              finishTime={fragmentFinishTime}
              setFinishTime={setFinishTime}
            />
          )}
        </div>
        <div className={styles.bottomButtons}>
          {/*           <Button className={styles.submit} onClick={clearValue} disabled={!isFragmentReady()}>
            try again
          </Button> */}
          <Button className={styles.submit} onClick={handleSaveData} disabled={!isFragmentReady()}>
            submit
          </Button>
        </div>
      </section>
    </section>
  );
}
