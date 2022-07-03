import { Typography, Input, Button } from 'antd';
import { ReactEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutPage from '../../components/templates/form-page';
import { useStore } from '../../store';
import styles from './video-player.module.scss';

type Props = {
  videoPreviewSrc: string;
  videoDuration: number;
  setVideoDuration: (videoDuration: number) => void;
};

export default function VideoPlayer({ videoPreviewSrc, videoDuration, setVideoDuration }: Props) {
  const [startTime, setStartTime] = useState(0);
  const [finishTime, setFinishTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      handleGettingDuration(videoRef.current);
      setFinishTime(startTime + videoRef.current.duration);
      videoRef.current.currentTime = startTime;
    }

    async function handleGettingDuration(element: HTMLVideoElement) {
      element.onloadedmetadata = function () {
        setVideoDuration(element.duration);
        setFinishTime(startTime + element.duration);
      };
    }
  }, [videoRef.current]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime, finishTime]);

  const handleTimeUpdate: ReactEventHandler<HTMLVideoElement> = e => {
    if (e.target) {
      if (e.currentTarget.currentTime < startTime || e.currentTarget.currentTime > finishTime) {
        e.currentTarget.pause();
        e.currentTarget.currentTime = startTime;
      }
    }
  };
  const handleStartTimeChanging: ReactEventHandler<HTMLInputElement> = e => {
    if (e.currentTarget.value) setStartTime(Number(e.currentTarget.value));
  };
  const handleFinishTimeChanging: ReactEventHandler<HTMLInputElement> = e => {
    setFinishTime(Number(e.currentTarget.value));
  };

  return (
    <section>
      Preview: confirm that all’s good
      <video
        ref={videoRef}
        className={styles['video-player']}
        src={videoPreviewSrc}
        onTimeUpdate={handleTimeUpdate}
        controls
      ></video>
      {videoDuration && (
        <div className={styles['slider-container']}>
          <input
            type='range'
            min='0'
            max={videoDuration}
            className={`${styles['slider']} ${styles['slider-start']}`}
            id='myRange'
            onChange={handleStartTimeChanging}
            value={String(startTime)}
          />
          <input
            type='range'
            min='0'
            max={videoDuration}
            className={`${styles['slider']} ${styles['slider-finish']}`}
            id='myRange'
            onChange={handleFinishTimeChanging}
            value={String(finishTime)}
          />
        </div>
      )}
    </section>
  );
}
