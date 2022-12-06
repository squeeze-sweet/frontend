import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui-elements/button';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

export default function Finish() {
  const [finishUrl, setFinishUrl] = useState('');
  const { fileNames, stepsData, mergeVideos, finalVideoData } = useStore(state => ({
    fileNames: state.filenames,
    stepsData: state.stepsData,
    mergeVideos: state.mergeVideos,
    finalVideoData: state.finalVideoData,
  }));

  useEffect(() => {
    if (finalVideoData) {
      console.log('finalVideoData', finalVideoData);
    }
  }, [finalVideoData]);

  const getFinalVideo = async (data, meta) => {
    await mergeVideos(data, JSON.stringify(meta));
  };
  useEffect(() => {
    let currentTime = 0;
    let files = [];
    let meta = [];
    fileNames.forEach((fileName: string, index) => {
      files.push(stepsData[fileName].file);
      if (!index) {
        meta.push({
          start_title: 'meet the peer',
          end_title: 'Alex Brent, Roll',
          content_type: 'video/mp4',
          trim: Math.floor(stepsData[fileName].fragmentStartTime),
          start: currentTime,
          length:
            Math.floor(stepsData[fileName].length) -
            Math.floor(stepsData[fileName].fragmentStartTime),
        });
      } else {
        meta.push({
          start_title: fileName,
          content_type: 'video/mp4',
          trim: Math.floor(stepsData[fileName].fragmentStartTime),
          start: currentTime,
          length:
            Math.floor(stepsData[fileName].length) -
            Math.floor(stepsData[fileName].fragmentStartTime),
        });
      }
      currentTime +=
        Math.floor(stepsData[fileName].length) - Math.floor(stepsData[fileName].fragmentStartTime);
      getFinalVideo(files, meta);
    });
  }, []);

  [
    {
      start_title: 'hello',
      end_title: 'end title here',
      content_type: 'video/mp4',
      trim: 5,
      start: 0,
      length: 5,
    },
    { start_title: 'ты пидор', content_type: 'video/mp4', trim: 5, start: 5, length: 5 },
  ];

  return (
    <section className={styles.container}>
      <h1>{!Boolean(finalVideoData) ? "You're video is almost here"! : 'Done!'} </h1>
      {finalVideoData && (
        <>
          <video className={styles.video} src={`${finalVideoData}`} poster='poster.jpg' controls />
        </>
      )}
    </section>
  );
}
