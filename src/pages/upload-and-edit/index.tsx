import { Button } from '../../components/ui-elements/button';
import { Link } from 'react-router-dom';
import UploadNavigation from '../../components/navigation';
import { useStore } from '../../store';
import styles from './step.module.scss';
import Uploader from '../uploader';
import Preview from '../preview';
import VideoPlayer from '../../components/video-player';

export default function UploadAndEdit() {
  const {
    currentFragmentName,
    currentStepData,
    currentStepData: { fragmentStartTime, fragmentFinishTime, videoPreviewSrc },
    setCurrentStepData,
    updateStepsData,
  } = useStore(state => ({
    currentFragmentName: state.currentFragmentName,
    currentStepData: state.currentStepData,
    setCurrentStepData: state.setCurrentStepData,
    updateStepsData: state.updateStepsData,
  }));

  const setStartTime = (time: number) => {
    setCurrentStepData({ ...currentStepData, fragmentStartTime: time });
  };

  const setFinishTime = (time: number) => {
    setCurrentStepData({ ...currentStepData, fragmentFinishTime: time });
  };

  const handleSaveData = () => {
    console.log('dawdwad');
    updateStepsData(currentFragmentName, currentStepData);
  };

  return (
    <section className={styles.page}>
      <UploadNavigation />
      <section className={styles.container}>
        <div className={styles.content}>
          <h1>{currentFragmentName}</h1>
          {videoPreviewSrc && (
            <VideoPlayer
              videoPreviewSrc={videoPreviewSrc}
              startTime={fragmentStartTime}
              setStartTime={setStartTime}
              finishTime={fragmentFinishTime}
              setFinishTime={setFinishTime}
            />
          )}
        </div>
        <div className={styles.buttons}>
          <Button className={styles.button}>
            {Boolean(videoPreviewSrc) ? 'record another video with webcam' : 'record with webcam'}
          </Button>
          <Uploader>
            {Boolean(videoPreviewSrc) ? 'upload another video from device' : 'upload from device'}
          </Uploader>
          <Button className={styles.button} onClick={handleSaveData}>
            submit
          </Button>
        </div>
      </section>
    </section>
  );
}
