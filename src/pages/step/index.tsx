import { Typography, Input, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './step.module.scss';

const { Title } = Typography;
export default function Step() {
  let { id } = useParams();
  const filenames = useStore(state => state.filenames);
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

  let videoElement: any;
  const saveVideo = (e: any) => {
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
      uploadFile({ fileName: filenames[Number(id)], fileDuration: videoElement.duration });
      if (Number(id) < filenames.length) {
        navigate(`/step-${Number(id) + 1}`);
      } else {
        navigate('/finish');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Typography>
        <Title>
          {id}. {filenames[Number(id) - 1]}
        </Title>
      </Typography>

      <input
        ref={inputRef}
        id='video-input'
        type='file'
        accept='video/*'
        onChange={saveVideo}
        className={styles.input}
      ></input>

      <Button htmlType='submit' type='primary' size='large'>
        Далее
      </Button>
    </form>
  );
}
