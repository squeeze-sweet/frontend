import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import styles from './video-player.module.scss';

type Props = {
  videoPreviewSrc: string;
  videoDuration: number;
  setVideoDuration: (videoDuration: number) => void;
  startTime: number;
  setStartTime: (setStartTime: number) => void;
  finishTime: number;
  setFinishTime: (setFinishTime: number) => void;
};

export default function VideoPlayer({
  videoPreviewSrc,
  videoDuration,
  setVideoDuration,
  startTime,
  setStartTime,
  finishTime,
  setFinishTime,
}: Props) {
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

  const handleTimeChange = ([startTime, finishTime]: any) => {
    console.log(startTime, finishTime);

    setFinishTime(finishTime);
    setStartTime(startTime);
  };

  return (
    <section className={styles.container}>
      Preview: confirm that all’s good
      <video
        ref={videoRef}
        className={styles['video-player']}
        src={videoPreviewSrc}
        onTimeUpdate={handleTimeUpdate}
        controls
      ></video>
      {videoDuration && (
        <div className={styles.slider}>
          <Slider
            range
            max={videoDuration}
            allowCross={false}
            defaultValue={[startTime, finishTime]}
            onChange={handleTimeChange}
          />
        </div>
      )}
    </section>
  );
}
