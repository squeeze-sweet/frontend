import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui-elements/button';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

export default function Finish() {
  const [finishUrl, setFinishUrl] = useState('');
  const { fileNames, stepsData, setPreloaderText } = useStore(state => ({
    fileNames: state.filenames,
    stepsData: state.stepsData,
    setPreloaderText: state.setPreloaderText,
  }));

  useEffect(() => {
    const uploadQueries: any[] = [];
    fileNames.forEach((fileName: string) => {
      uploadQueries.push(
        console.log(
          fileName,
          stepsData[fileName].fragmentStartTime,
          stepsData[fileName].fragmentFinishTime,
          stepsData[fileName].videoPreviewSrc,
        ),
      );
    });

    console.log('финиш');
  }, []);

  return (
    <section className={styles.container}>
      <h1>{!Boolean(finishUrl) ? "You're video is almost here"! : 'Done!'} </h1>
      {finishUrl && (
        <>
          <video className={styles.video} src={`${finishUrl}`} poster='poster.jpg' controls />
        </>
      )}
    </section>
  );
}
