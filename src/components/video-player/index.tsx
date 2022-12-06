import { ReactEventHandler, useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import styles from './video-player.module.scss';
import { useStore } from '../../store';
import useLang from '../../hooks/useLang';

type Props = {
  videoPreviewSrc: string;
  resetVideoPreviewSrs: () => void;
  setError: (error: string) => void;
  startTime: number;
  setStartTime: (time: number) => void;
  finishTime: number;
  setFinishTime: (time: number) => void;
  clearValue: () => void;
  initFinishTime: (time: number) => void;
};

export default function VideoPlayer({
  videoPreviewSrc,
  resetVideoPreviewSrs,
  startTime,
  setStartTime,
  finishTime,
  setFinishTime,
  clearValue,
  setError,
  initFinishTime,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const { tr } = useLang();
  const marks = {
    [startTime]: startTime,
    [finishTime]: Math.round(finishTime),
  };

  const handleError = () => {
    resetVideoPreviewSrs();
  };

  useEffect(() => {
    if (finishTime - startTime > 30) {
      clearValue;
      setError(tr('video length is too big, please upload video less then 30s.'));
    } else {
      setError('');
    }
  }, [finishTime, startTime]);

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
            !finishTime && initFinishTime(finishTime);
          } else {
            setVideoDuration(element.duration);
            !finishTime && initFinishTime(element.duration);
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
            marks={marks}
            ref={sliderRef}
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
