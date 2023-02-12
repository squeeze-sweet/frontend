/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useRef, useState } from "react";
import uloadIcon from "../../assets/icons/upload.svg";
import { useStore } from "../../store";
import Dropzone from "react-dropzone";
import useLang from "../../hooks/useLang";
import styles from "./step.module.scss";

interface Props {
  children?: string;
}
export default function Uploader({ children }: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const { tr } = useLang();
  const { currentStepData, setCurrentStepData } = useStore((state) => ({
    currentStepData: state.currentStepData,
    setCurrentStepData: state.setCurrentStepData,
  }));

  const saveVideo = (file: any) => {
    const videoPreviewSrc = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e: any) {
      setCurrentStepData({
        ...currentStepData,
        videoPreviewSrc: videoPreviewSrc,
        fragmentData: e.target.result,
        file: file,
      });
    };
    reader.onerror = function (error: any) {
      console.error(error);
    };
  };

  const validateTimeAndSize = (file: any) => {
    /*     if (file.type !== "video/mp4" && file.type !== "video/mov") {
      setErrorMsg("unsupported file type!");
    }
    if (file.size > 52428800) error += "please choose the file less then 50mb"; */
  };
  const handleDrop = useCallback((acceptedFiles: any) => {
    validateTimeAndSize(acceptedFiles[0]);
    saveVideo(acceptedFiles[0]);
  }, []);

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={{ "video/mp4": [".mp4"], "video/mov": [".mov"] }}
      maxSize={52428800}
    >
      {({
        getRootProps,
        getInputProps,
        fileRejections,
        isDragAccept,
        isDragReject,
      }) => {
        const additionalClass = isDragAccept
          ? "accept"
          : isDragReject
          ? "reject"
          : "";
        return (
          <div
            {...getRootProps({
              className: styles.dropzone,
            })}
          >
            <input {...getInputProps()} accept="video/mp4, video/mov" />
            <div className={styles.description}>
              <img src={uloadIcon} alt="upload" />
              <p>{tr("Upload video")}</p>
              <p>{tr(".mp4 of .mov format, less than 10 mb")}</p>
            </div>
            {<div className={styles.errorMsg}>{errorMsg}</div>}
          </div>
        );
      }}
    </Dropzone>
  );
}
