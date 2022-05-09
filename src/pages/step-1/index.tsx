import { useState } from 'react';
import { useStore } from '../../store';
import styles from './step-1.module.scss';

export default function Step1() {
  const [fileName, setFileName] = useState<any>(null);
  const [chosenFile, setChosenFile] = useState<any>(null);

  const addFile = useStore(state => state.addFile);
  const uploadFile = useStore(state => state.uploadFile);

  const saveVideo = (e: any) => {
    console.log('save video');
    console.log('input data:', e.target.files[0]);
    /*
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      var videoElement = document.createElement('video');
      videoElement.src = e.target.result;
      var timer = setInterval(() => {
        if (videoElement.readyState === 4) {
          if (videoElement.duration) {
            console.log('video-file', videoElement); //the file object
            console.log('videoElement', videoElement.duration); //video duration
            addFile(videoElement);
          }
          clearInterval(timer);
        }
      }, 500);
    };
    reader.readAsDataURL(file);
    */

    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = function (e: any) {
      // binary data
      console.log('результат работы reader', e.target.result);
      addFile(e.target.result);
    };
    reader.onerror = function (e: any) {
      // error occurred
      console.log('Error : ' + e.type);
    };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    uploadFile('file5');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Ваше любимое блюдо</h2>
      {/*<input type='text' value={fileName} onChange={setFileName}></input>*/}
      <input type='file' accept='video/*' id='video-input' onChange={saveVideo}></input>
      <button type='submit'>Далее</button>
    </form>
  );
}
