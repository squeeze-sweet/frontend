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
    setFile(file);
  };

  const validateSize = (file: any) => {
    let error = '';
    if (file.size > 52428800) setError('please choose the file less then 50mb');
  };

  const handleDrop = useCallback((acceptedFiles: any) => {
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
                  <p>Upload file</p>
                  <p>Click to upload or drag and</p>
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
