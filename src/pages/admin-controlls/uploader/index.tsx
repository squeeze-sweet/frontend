/* eslint-disable react/jsx-props-no-spreading */
import { Typography, Input, Button } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uloadIcon from '../../../assets/icons/upload.svg';
import Dropzone from 'react-dropzone';
import styles from './step.module.scss';

export default function Uploader({ file, setFile, error, setError }: any) {
  const [name, setName] = useState('');

  const saveVideo = (file: any) => {
    const videoPreviewSrc = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e: any) {
      setFile(e.target.result);
    };
    reader.onerror = function (error: any) {
      console.error(error);
    };
  };

  const validateSize = (file: any) => {
    let error = '';
    if (file.size > 52428800) setError('please choose the file less then 50mb');
  };

  const handleDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0]);
    setName(acceptedFiles[0].name);
    validateSize(acceptedFiles[0]);
    saveVideo(acceptedFiles[0]);
  }, []);

  return (
    <Dropzone onDrop={handleDrop} accept={{ 'audio/mp3': ['.mp3'] }}>
      {({ getRootProps, getInputProps }) => {
        return (
          <div
            {...getRootProps({
              className: styles.dropzone,
            })}
          >
            <input {...getInputProps()} />
            <div className={styles.description}>
              <img src={uloadIcon} alt='upload' />

              {name ? (
                name
              ) : (
                <>
                  {' '}
                  <p>Upload audio</p>
                  <p>Any format, less than 10 mb</p>
                </>
              )}
              {error && error}
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
}
