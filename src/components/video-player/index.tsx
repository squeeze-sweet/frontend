import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import styles from './video-player.module.scss';
import { useStore } from '../../store';

type Props = {
  videoPreviewSrc: string;
  resetVideoPreviewSrs: () => void;
  startTime: number;
  setStartTime: (time: number) => void;
  finishTime: number;
  setFinishTime: (time: number) => void;
};

export default function VideoPlayer({
  videoPreviewSrc,
  resetVideoPreviewSrs,
  startTime,
  setStartTime,
  finishTime,
  setFinishTime,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleError = () => {
    resetVideoPreviewSrs();
  };

  useEffect(() => {
    if (videoRef.current) {
      if (!videoDuration) handleGettingDuration(videoRef.current);
      videoRef.current.currentTime = startTime;
    }

    async function handleGettingDuration(element: HTMLVideoElement) {
      element.onloadedmetadata = function () {
        if (videoPreviewSrc) {
          if (element.duration === Infinity) {
            setVideoDuration(finishTime);
            !finishTime && setFinishTime(finishTime);
          } else {
            setVideoDuration(element.duration);
            !finishTime && setFinishTime(element.duration);
          }
          
        }
      };
    }
  }, [videoRef.current]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime, finishTime]);

  const handleTimeUpdate: ReactEventHandler<HTMLVideoElement> = e => {
    if (e.currentTarget) {
      if (e.currentTarget.currentTime < startTime || e.currentTarget.currentTime > finishTime) {
        e.currentTarget.pause();
        e.currentTarget.currentTime = startTime;
      }
    }
  };

  const handleTimeChange = ([inputStartTime, inputFinishTime]: any) => {
    if (finishTime !== inputFinishTime) setFinishTime(inputFinishTime);
    if (startTime !== inputStartTime) setStartTime(inputStartTime);
  };

  return (
    <section className={styles.container}>
      <video
        ref={videoRef}
        className={styles['video-player']}
        src={videoPreviewSrc}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        controls
      ></video>
      {videoDuration && (
        <div className={styles.slider}>
          <Slider
            range
            max={videoDuration}
            allowCross={false}
            value={[startTime, finishTime ? finishTime : videoDuration]}
            onChange={handleTimeChange}
          />
        </div>
      )}
    </section>
  );
}
