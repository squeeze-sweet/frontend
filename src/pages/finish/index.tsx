import { useEffect, useState } from "react";
import { useStore } from "../../store";
import useLang from "../../hooks/useLang";

import styles from "./step-2.module.scss";
import Preloader from "../../components/ui-elements/preloader";
import { Button } from "../../components/ui-elements/button";

export default function Finish() {
  const { lang } = useLang();
  const {
    preloaderText,
    fileNames,
    stepsData,
    mergeVideos,
    finalVideoData,
    resetFinalVideoData,
    chosenAudioId,
    userInfo,
  } = useStore((state) => ({
    preloaderText: state.preloaderText,
    fileNames: state.filenames,
    stepsData: state.stepsData,
    mergeVideos: state.mergeVideos,
    finalVideoData: state.finalVideoData,
    resetFinalVideoData: state.resetFinalVideoData,
    chosenAudioId: state.chosenAudioId,
    userInfo: state.userInfo,
  }));

  const getFinalVideo = async (data, meta, chosenAudioId) => {
    await mergeVideos(data, JSON.stringify(meta), chosenAudioId);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = finalVideoData;
    link.setAttribute("download", "result.mp4");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  useEffect(() => {
    let currentTime = 0;
    let files = [];
    let meta = [];
    fileNames.forEach((fileName: string, index) => {
      files.push(stepsData[fileName].file);
      if (!index) {
        meta.push({
          application_title:
            lang === "en" ? "meet your <br> peer" : "rencontre tes <br> pairs",
          user_name: `${userInfo.firstName} ${userInfo.lastName}, <br> ${userInfo.jobTitle}`,
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
    console.log(meta);

    getFinalVideo(files, meta, chosenAudioId);
    return resetFinalVideoData();
  }, []);

  return (
    <section className={styles.container}>
      <h1>
        {!Boolean(finalVideoData)
          ? lang === "en"
            ? "your video is almost here!"
            : "Votre vidéo est presque prête!"
          : lang === "en"
          ? "Done!"
          : "Fini!"}
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
          <Button onClick={handleDownload}>
            {lang === "en" ? "Download" : "Télécharger"}
          </Button>
        </>
      )}
    </section>
  );
}
