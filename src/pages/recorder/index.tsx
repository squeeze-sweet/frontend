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
  const [recordingCount, setRecordingCount] = useState(30);

  var recordingCounter: any;

  const startCount = () => {
    recordingCounter = setInterval(() => {
      

      setRecordingCount(prev => {
        console.log('recordingCount', prev);
        if (prev <= 0) {
          handleStopCaptureClick();
        }
        return prev - 1;
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
    /* setRecordingCount(0) */
    clearInterval(recordingCounter);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  /*   useEffect(()=>{
    if (recordedChunks.length && !capturing) {
    handleDownload()
    }
  }, [capturing]) */

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
      /* 
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = function (e: any) {};
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'react-webcam-stream-capture.webm';
      a.click();
      window.URL.revokeObjectURL(url); */
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  useEffect(() => {
    if (recordedChunks.length) {
      handleDownload();
    }
  }, [recordedChunks.length]);

  const videoConstraints = {
    /*   width: { min: 480 },
  height: { min: 720 }, */
    aspectRatio: 1.77777777778,
  };

  return (
    <>
      <h1>Inctoduce yourself</h1>
      <p>tell your name and your current title</p>

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
      {Boolean(recordingCount !== 30) && (
        <>
          {' '}
          <p className={styles.red}>recording</p>
          <p className={cn(styles.count)}>time left: {recordingCount}</p>
        </>
      )}
    </>
  );
};

// https://www.npmjs.com/package/react-webcam

/* 
export default function Step() {
  const filenames = useStore(state => state.filenames);
  const updateStepsData = useStore(state => state.updateStepsData);

  const { status, setStatus } = useStore(state => state);

  const [videoPreviewSrc, setVideoPreviewSrc] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);

  const fileData = useRef<any>(null);

  let { id } = useParams();

  let navigate = useNavigate();

  const inputRef = useRef<any>(null);
  const uploadFile = useStore(state => state.uploadFile);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.value = '';
    }
  }, [id]);

  useEffect(() => {
    setStartTime(0);
    setFinishTime(0);
    setStatus(STATUSES.initial);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      uploadFile({
        fileName: filenames[Number(id) - 1],
        fileData: fileData.current,
        videoDuration,
        startTime,
        finishTime,
      });

      updateStepsData({
        fragmentName: filenames[Number(id) - 1],
        fragmentData: fileData.current,
        fragmentStartTime: startTime,
        fragmentFinishTime: finishTime,
        videoPreviewSrc: videoPreviewSrc,
      });
    }
  };

  const saveVideo = (e: any) => {
    var file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    setVideoPreviewSrc(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e: any) {
      fileData.current = e.target.result;
    };
    reader.onerror = function (e: any) {
      // error occurred
      console.log('Error : ' + e.type);
    };
  };

  return (
    <LayoutPage onSubmit={handleSubmit} heading={filenames[Number(id) - 1]} buttonText='Continue'>
      <>
        <input
          ref={inputRef}
          id='video-input'
          type='file'
          accept='video/*'
          onChange={saveVideo}
          className={styles.input}
        ></input>

        {videoPreviewSrc && (
          <VideoPlayer
            videoPreviewSrc={videoPreviewSrc}
            videoDuration={videoDuration}
            setVideoDuration={setVideoDuration}
            startTime={startTime}
            setStartTime={setStartTime}
            finishTime={finishTime}
            setFinishTime={setFinishTime}
          />
        )}
      </>
    </LayoutPage>
  );
}
 */
