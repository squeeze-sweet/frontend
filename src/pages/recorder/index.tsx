import { useRef, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import Webcam from 'react-webcam';
import { VideoButton } from '../../components/ui-elements/video-button';
import { useStore } from '../../store';

import styles from './recorder.module.scss';

export const Recorder = () => {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState<any>(false);
  const [recordedChunks, setRecordedChunks] = useState<any>([]);
  const [count, setCount] = useState<any>(0);
  const { currentStepData, setCurrentStepData } = useStore(state => ({
    currentStepData: state.currentStepData,
    setCurrentStepData: state.setCurrentStepData,
  }));
  const [recordingCount, setRecordingCount] = useState(0);

  var recordingCounter: any;

  const startCount = () => {
    recordingCounter = setInterval(() => {
      setRecordingCount(prev => {
        if (prev > 30) {
          handleStopCaptureClick();
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStartCaptureClick = useCallback(() => {
    setCount(3);
    setTimeout(() => {
      setCount(2);
      setTimeout(() => {
        setCount(1);
        setTimeout(() => {
          setCount(0);
        }, 1000);
      }, 1000);
    }, 1000);

    setTimeout(() => {
      startCount();
      startCapturing();
    }, 3000);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const startCapturing = () => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef?.current?.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  };
  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev: any) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    clearInterval(recordingCounter);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);

      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = function (e: any) {
        setCurrentStepData({
          ...currentStepData,
          videoPreviewSrc: url,
          fragmentData: e.target.result,
          fragmentStartTime: 0,
          fragmentFinishTime: recordingCount,
        });
      };
      reader.onerror = function (error: any) {
        console.error(error);
      };
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  useEffect(() => {
    if (recordedChunks.length) {
      handleDownload();
    }
  }, [recordedChunks.length]);

  const videoConstraints = {
    aspectRatio: 1.77777777778,
  };

  return (
    <>
      <div className={styles.recorder}>
        <Webcam
          videoConstraints={videoConstraints}
          audio={true}
          muted
          ref={webcamRef}
          className={styles.webcam}
        />
        {Boolean(count) && <p className={styles.counter}>{count}</p>}
        <VideoButton
          onClick={capturing ? handleStopCaptureClick : handleStartCaptureClick}
          isCapturing={capturing}
          className={styles['record-button']}
        />
      </div>
      {Boolean(recordingCount !== 0) && (
        <>
          {' '}
          <p className={styles.red}>recording</p>
          <p className={cn(styles.count)}>time left: {30 - recordingCount}</p>
        </>
      )}
    </>
  );
};
