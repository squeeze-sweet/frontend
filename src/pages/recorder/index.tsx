import { useRef, useState, useCallback } from 'react';

import Webcam from 'react-webcam';
import { VideoButton } from '../../components/ui-elements/video-button';

import styles from './recorder.module.scss';

export const Recorder = () => {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState<any>(false);
  const [recordedChunks, setRecordedChunks] = useState<any>([]);
  const [count, setCount] = useState<any>(0);
  const [url, setUrl] = useState<any>(null);

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
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = function (e: any) {};
      const a = document.createElement('a');
      document.body.appendChild(a);
      /*       a.style = "display: none"; */
      a.href = url;
      a.download = 'react-webcam-stream-capture.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <h1>Inctoduce yourself</h1>
      <p>tell your name and your current title</p>

      <div className={styles.recorder}>
        <Webcam audio={true} muted ref={webcamRef} className={styles.webcam} />
        {Boolean(count) && <p className={styles.counter}>{count}</p>}
        <VideoButton
          onClick={capturing ? handleStopCaptureClick : handleStartCaptureClick}
          isCapturing={capturing}
          className={styles['record-button']}
        />
      </div>
      {recordedChunks.length > 0 && <button onClick={handleDownload}>Download</button>}
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
