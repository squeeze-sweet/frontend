import { Typography, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

const { Title } = Typography;
export default function Finish() {
  const downloadLinks = useStore(state => state.downloadLinks);
  const finishUrl = useStore(state => state.finishUrl);
  const getDownloadLinks = useStore(state => state.getDownloadLinks);
  const getFinalLink = useStore(state => state.getFinalLink);
  const finishId = useStore(state => state.finishId);

  if (finishId) {
    setTimeout(() => {
      getFinalLink();
    }, 7000);
  }

  useEffect(() => {
    if (!downloadLinks.length) {
      setTimeout(() => {
        getDownloadLinks();
      }, 7000);
    }
  }, []);

  return (
    <section className={styles.container}>
      <Typography>
        <Title>1. You'r video is here!</Title>
      </Typography>
      {
        <video
          src='https://shotstack-api-stage-output.s3-ap-southeast-2.amazonaws.com/l3nql2zmm6/f6346480-a47e-40c3-8e48-911d0412a311.mp4'
          poster='poster.jpg'
          controls
        ></video>
      }
    </section>
  );
}
