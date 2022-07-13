import { Typography, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './step-2.module.scss';

const { Title } = Typography;
export default function Finish() {
  const createVideo = useStore(state => state.createVideo);
  const finishUrl = useStore(state => state.finishUrl);

  /*   useEffect(() => {
    createVideo();
  }, []); */

  const handleClick = () => {
    createVideo();
  };
  return (
    <section className={styles.container}>
      <button onClick={handleClick}>fawfafawfawf</button>
      <Typography>
        <Title>{!Boolean(finishUrl) ? "You're video is almost here"! : 'Done!'} </Title>
      </Typography>
      {finishUrl && <video src={`${finishUrl}`} poster='poster.jpg' controls></video>}
    </section>
  );
}
