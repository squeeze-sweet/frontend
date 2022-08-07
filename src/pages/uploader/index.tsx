/* eslint-disable react/jsx-props-no-spreading */
import { Typography, Input, Button } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uloadIcon from '../../assets/icons/upload.svg';
import { useStore } from '../../store';
import Dropzone from 'react-dropzone';
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

  const saveVideo = (file: any) => {
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

  const handleDrop = useCallback((acceptedFiles: any) => {
    saveVideo(acceptedFiles[0]);
  }, []);

  /*   const { getInputProps, isDragActive, getRootProps } = useDropzone({ onDrop }); */

  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
        const additionalClass = isDragAccept ? 'accept' : isDragReject ? 'reject' : '';

        return (
          <div
            {...getRootProps({
              className: styles.dropzone,
            })}
          >
            <input {...getInputProps()} />
            <div className={styles.description}>
              <img src={uloadIcon} alt='upload' />
              <p>Upload the video</p>
              <p>Any format, less than 10 mb</p>
            </div>
          </div>
        );
      }}
    </Dropzone>
    /* 
    <label className={styles.label} {...getRootProps()}>
      {children}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
            <input
        ref={inputRef}
        id='video-input'
        type='file'
        accept='video/*'
        onClick={clearValue}
        onChange={saveVideo}
        className={styles.input}
        
      ></input> 
      <input {...getInputProps()} />
    </label> */
  );
}
