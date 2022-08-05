import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui-elements/button';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

export default function Finish() {
  const createVideo = useStore(state => state.createVideo);
  const finishUrl = useStore(state => state.finishUrl);
  /* 
  const [isAllVideosUploaded, setIsAllVideosUploaded] = useState(false); */
  const { filenames, stepsData, setPreloaderText } = useStore(state => ({
    filenames: state.filenames,
    stepsData: state.stepsData,
    setPreloaderText: state.setPreloaderText,
  }));

  const checkIsVideosUploaded: any = () => {
    let isValid = true;
    filenames.forEach((filename: string) => {
      if (!Boolean(stepsData[filename].downloadLink)) {
        isValid = false;
      }
    });
    return isValid;
  };

  useEffect(() => {
    setPreloaderText('Uploading on Google Drive');
    createVideo();
  }, []);

  /*   useEffect(() => {
    if (checkIsVideosUploaded()) {
      setPreloaderText('Rendering');
      uploadVideo();
    }
  }, [stepsData]);

  useEffect(() => {
    if (finishUrl) {
      setPreloaderText('');
    }
  }, [finishUrl]); */

  return (
    <section className={styles.container}>
      {/*       <Button onClick={handleClick}>Create</Button> */}
      {/*       <Button onClick={handleUploadVideo}>Upload</Button> */}
      <h1>{!Boolean(finishUrl) ? "You're video is almost here"! : 'Done!'} </h1>
      {finishUrl && <video src={`${finishUrl}`} poster='poster.jpg' controls></video>}
    </section>
  );
}
