import { Typography, Input, Button } from 'antd';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import LayoutPage from '../../components/templates/form-page';
import VideoPlayer from '../../components/video-player';
import { uploadVideo } from '../../services/api/api-yandex-disk';
import { STATUSES } from '../../services/types';
import { useStore } from '../../store';

import styles from './recorder.module.scss';

export const Recorder = () => {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState<any>(false);
  const [recordedChunks, setRecordedChunks] = useState<any>([]);
  const [url, setUrl] = useState<any>(null)

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);

      mediaRecorderRef.current = new MediaRecorder(webcamRef?.current?.stream, {
        mimeType: "video/webm"
      });

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev: any) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = function (e: any) {
        console.log('file', e.target.result);
        
      };
      console.log('blob',blob);
      console.log('url',url);
      const a = document.createElement("a");
      document.body.appendChild(a);
/*       a.style = "display: none"; */
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <LayoutPage onSubmit={()=>{}} heading='Название' buttonText='Continue'>
      <>

      <Webcam audio={false} ref={webcamRef} className={styles.webcam}/>
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
      </>
    </LayoutPage>
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