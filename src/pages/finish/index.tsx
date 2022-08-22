import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui-elements/button';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

export default function Finish() {
  const createVideo = useStore(state => state.createVideo);
  /* 
  const [isAllVideosUploaded, setIsAllVideosUploaded] = useState(false); */
  const { filenames, stepsData, setPreloaderText, finishUrl, setFinishUrl, blobToDownload } =
    useStore(state => ({
      filenames: state.filenames,
      stepsData: state.stepsData,
      setPreloaderText: state.setPreloaderText,
      finishUrl: state.finishUrl,
      setFinishUrl: state.setFinishUrl,
      blobToDownload: state.blobToDownload,
    }));

  useEffect(() => {
    return () => {
      setFinishUrl('');
    };
  }, []);

  /*   useEffect(() => {
    if (finishUrl) {
      setPreloaderText('');
    }
  }, [finishUrl]); */
  const forceDownload = (blob: any, filename: any) => {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  const handleDownload = () => {
    let blobUrl = window.URL.createObjectURL(blobToDownload);
    forceDownload(blobUrl, 'result');
  };

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

  return (
    <section className={styles.container}>
      {/*       <Button onClick={handleClick}>Create</Button> */}
      {/*       <Button onClick={handleUploadVideo}>Upload</Button> */}
      <h1>{!Boolean(finishUrl) ? "You're video is almost here"! : 'Done!'} </h1>
      {finishUrl && (
        <>
          <video className={styles.video} src={`${finishUrl}`} poster='poster.jpg' controls />
          {/*           <Button disabled={!blobToDownload} onClick={handleDownload}>
            Download
          </Button> */}
        </>
      )}
    </section>
  );
}
