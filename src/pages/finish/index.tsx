import { Typography, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import shotStackApi from '../../services/api/api-shotstack';
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
    }, 13000);
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
        <Title>{!Boolean(finishUrl) ? "You're video is almost here"! : 'Done!'} </Title>
      </Typography>
      {finishUrl && <video src={`${finishUrl}`} poster='poster.jpg' controls></video>}
    </section>
  );
}
