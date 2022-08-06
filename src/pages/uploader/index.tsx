import { Typography, Input, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './step.module.scss';

interface Props {
  children?: string;
}
export default function Uploader({ children }: Props) {
  const { currentStepData, setCurrentStepData } = useStore(state => ({
    currentStepData: state.currentStepData,
    setCurrentStepData: state.setCurrentStepData,
  }));

  const inputRef = useRef<any>(null);

  const clearValue = () => {
    setCurrentStepData({
      ...currentStepData,
      videoPreviewSrc: '',
      fragmentData: '',
      fragmentStartTime: 0,
      fragmentFinishTime: 0,
    });
    inputRef.current.value = '';
  };

  const saveVideo = (e: any) => {
    const file = e.target.files[0];
    const videoPreviewSrc = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e: any) {
      setCurrentStepData({
        ...currentStepData,
        videoPreviewSrc: videoPreviewSrc,
        fragmentData: e.target.result,
      });
    };
    reader.onerror = function (error: any) {
      console.error(error);
    };
  };

  return (
    <label className={styles.label}>
      {children}
      <input
        ref={inputRef}
        id='video-input'
        type='file'
        accept='video/*'
        onClick={clearValue}
        onChange={saveVideo}
        className={styles.input}
      ></input>
    </label>
  );
}
