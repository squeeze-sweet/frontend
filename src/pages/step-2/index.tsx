import React from 'react';

export default function Step2() {
  const saveVideo = (e: any) => {
    console.log(e.target.files[0]);
  };

  const logFile = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={logFile}>
      <input type='file' accept='video/*' id='video-input' onChange={saveVideo}></input>
      <button type='submit'>Зацени файл!</button>
    </form>
  );
}
