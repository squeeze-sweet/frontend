import { Typography, Input, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutPage from '../../components/templates/form-page';
import VideoPlayer from '../../components/video-player';
import { useStore } from '../../store';
import styles from './step.module.scss';

export default function Step() {
  const filenames = useStore(state => state.filenames);
  const [videoPreviewSrc, setVideoPreviewSrc] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  let { id } = useParams();

  let navigate = useNavigate();

  const inputRef = useRef<any>(null);
  const addFile = useStore(state => state.addFile);
  const uploadFile = useStore(state => state.uploadFile);

  useEffect(() => {
    if (inputRef) {
      console.log(inputRef);
      inputRef.current.value = '';
    }
  }, [id]);

  const saveVideo = (e: any) => {
    var file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    setVideoPreviewSrc(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e: any) {
      // binary data
      console.log('результат работы reader', e.target.result);
      addFile(e.target.result);
    };
    reader.onerror = function (e: any) {
      // error occurred
      console.log('Error : ' + e.type);
    };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      uploadFile({ fileName: filenames[Number(id)], fileDuration: videoDuration });
      if (Number(id) < filenames.length) {
        navigate(`/step-${Number(id) + 1}`);
      } else {
        navigate('/finish');
      }
    }
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
          />
        )}
      </>
    </LayoutPage>
  );
}
