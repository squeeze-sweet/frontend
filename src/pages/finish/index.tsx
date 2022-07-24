
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui-elements/button';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

export default function Finish() {
  const createVideo = useStore(state => state.createVideo);
  const uploadVideo = useStore(state => state.uploadVideo);
  const finishUrl = useStore(state => state.finishUrl);

  /*   useEffect(() => {
    createVideo();
  }, []); */

  const handleClick = () => {
    createVideo();
  };
  const handleUploadVideo = () => {
    uploadVideo();
  };


  return (
    <section className={styles.container}>
      <Button onClick={handleClick}>Create</Button>
      <Button onClick={handleUploadVideo}>Upload</Button>
        <h1>{!Boolean(finishUrl) ? "You're video is almost here"! : 'Done!'} </h1>
      {finishUrl && <video src={`${finishUrl}`} poster='poster.jpg' controls></video>}
    </section>
  );
}
