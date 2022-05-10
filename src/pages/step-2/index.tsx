import { Typography, Input, Button } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

const { Title } = Typography;
export default function Step2() {
  const [fileName, setFileName] = useState<any>(null);
  const [chosenFile, setChosenFile] = useState<any>(null);
  let navigate = useNavigate();
  const addFile = useStore(state => state.addFile);
  const uploadFile = useStore(state => state.uploadFile);
  let videoElement: any;
  const saveVideo = (e: any) => {
    console.log('save video');
    console.log('input data:', e.target.files[0]);

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      videoElement = document.createElement('video');
      videoElement.src = e.target.result;
      var timer = setInterval(() => {
        if (videoElement.readyState === 4) {
          if (videoElement.duration) {
            console.log('videoElement duration', videoElement.duration); //video duration
          }
          clearInterval(timer);
        }
      }, 500);
    };
    reader.readAsDataURL(file);

    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

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
    uploadFile({ fileName: 'favouritemovie', fileDuration: videoElement.duration });
    navigate('/finish');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Typography>
        <Title>2. Your favourite movie</Title>
      </Typography>
      <Input
        type='file'
        accept='video/*'
        id='video-input'
        onChange={saveVideo}
        className={styles.input}
      />
      <Button htmlType='submit' type='primary' size='large'>
        Далее
      </Button>
    </form>
  );
}
