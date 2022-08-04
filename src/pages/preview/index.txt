import { Typography, Input, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutPage from '../../components/templates/form-page';
import VideoPlayer from '../../components/video-player';
import { uploadVideo } from '../../services/api/api-yandex-disk';
import { STATUSES } from '../../services/types';
import { useStore } from '../../store';
import styles from './step.module.scss';

export default function Preview() {
  const {
    currentStepData,
    currentStepData: { fragmentStartTime, fragmentFinishTime, videoPreviewSrc },
    setCurrentStepData,
  } = useStore(state => ({
    currentStepData: state.currentStepData,
    setCurrentStepData: state.setCurrentStepData,
  }));

  const setStartTime = (time: number) => {
    setCurrentStepData({ ...currentStepData, fragmentStartTime: time });
  };

  const setFinishTime = (time: number) => {
    setCurrentStepData({ ...currentStepData, fragmentFinishTime: time });
  };

  return (
    <div>
      {videoPreviewSrc && (
        <VideoPlayer
          videoPreviewSrc={videoPreviewSrc}
          startTime={fragmentStartTime}
          setStartTime={setStartTime}
          finishTime={fragmentFinishTime}
          setFinishTime={setFinishTime}
        />
      )}
    </div>
  );
}
