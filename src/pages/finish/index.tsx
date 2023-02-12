import { useEffect, useState } from "react";
import { useStore } from "../../store";
import useLang from "../../hooks/useLang";

import styles from "./step-2.module.scss";
import Preloader from "../../components/ui-elements/preloader";

export default function Finish() {
  const [finishUrl, setFinishUrl] = useState("");

  const { lang } = useLang();
  const {
    preloaderText,
    fileNames,
    stepsData,
    mergeVideos,
    finalVideoData,
    chosenAudioId,
    userInfo,
  } = useStore((state) => ({
    preloaderText: state.preloaderText,
    fileNames: state.filenames,
    stepsData: state.stepsData,
    mergeVideos: state.mergeVideos,
    finalVideoData: state.finalVideoData,
    chosenAudioId: state.chosenAudioId,
    userInfo: state.userInfo,
  }));

  const getFinalVideo = async (data, meta, chosenAudioId) => {
    await mergeVideos(data, JSON.stringify(meta), chosenAudioId);
  };

  useEffect(() => {
    let currentTime = 0;
    let files = [];
    let meta = [];
    fileNames.forEach((fileName: string, index) => {
      files.push(stepsData[fileName].file);
      if (!index) {
        meta.push({
          start_title: lang === "en" ? "meet your peer" : "Rencontre tes pairs",
          end_title: `${userInfo.firstName} ${userInfo.lastName}, ${userInfo.jobTitle}`,
          content_type: "video/mp4",
          trim: Math.floor(stepsData[fileName].fragmentStartTime),
          start: currentTime,
          length:
            Math.floor(stepsData[fileName].length) -
            Math.floor(stepsData[fileName].fragmentStartTime),
        });
      } else {
        meta.push({
          start_title: fileName,
          content_type: "video/mp4",
          trim: Math.floor(stepsData[fileName].fragmentStartTime),
          start: currentTime,
          length:
            Math.floor(stepsData[fileName].length) -
            Math.floor(stepsData[fileName].fragmentStartTime),
        });
      }
      currentTime +=
        Math.floor(stepsData[fileName].length) -
        Math.floor(stepsData[fileName].fragmentStartTime);
    });
    getFinalVideo(files, meta, chosenAudioId);
  }, []);

  return (
    <section className={styles.container}>
      <h1>
        {!Boolean(finalVideoData) ? "your video is almost here"! : "Done!"}{" "}
      </h1>
      {!Boolean(finalVideoData) && preloaderText && <Preloader />}
      {finalVideoData && (
        <>
          <video
            className={styles.video}
            src={`${finalVideoData}`}
            poster="poster.jpg"
            controls
          />
        </>
      )}
    </section>
  );
}
