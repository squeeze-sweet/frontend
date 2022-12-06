import { TITLE_VIDEO_DURATION, VIDEO_TITLEDURATION } from './constants';

export const makePremadeVideo = (downloadLink: string) => {
  return [
    {
      asset: {
        type: 'video',
        src: downloadLink,
      },
      start: 0,
      length: 5,
      fit: 'none',
      position: 'center',
      scale: 0.7,
      transition: {
        in: 'fade',
        out: 'fade',
      },
    },
  ];
};

export const makeClipJsonForTitlePage = (
  name: string,
  jobTitle: string,
  currentDuration: number,
) => {
  return {
    asset: {
      type: 'html',
      html: `<p class='name'>${name}</p><p class='job-title'>${jobTitle}</p>`,
      css: ".name { font-family: 'Montserrat ExtraBold'; color: #ffffff; font-size: 30px; } .job-title, .email { font-family: 'Montserrat ExtraBold'; color: #ffffff; font-size: 15px;}",
    },
    transition: {
      in: 'fade',
      out: 'fade',
    },
    start: currentDuration,
    length: TITLE_VIDEO_DURATION,
  };
};

export const makeVideoClip = ({
  currentDuration,
  fileName,
  downloadLink,
  startTime,
  finishTime,
}: any) => {
  return [
    {
      asset: {
        type: 'html',
        html: `<p class='name'>${fileName}</p>`,
        css: ".name { font-family: 'Montserrat ExtraBold'; color: #ffffff; font-size: 30px; }",
      },
      transition: {
        in: 'fade',
        out: 'fade',
      },
      start: currentDuration,
      length: VIDEO_TITLEDURATION,
    },
    {
      asset: {
        type: 'video',
        src: downloadLink,
        trim: startTime,
      },
      start: currentDuration + VIDEO_TITLEDURATION,
      length: finishTime - startTime,
      fit: 'cover',
      position: 'center',
      scale: 0.8,
      transition: {
        in: 'fade',
        out: 'fade',
      },
    },
  ];
};

export const makeVideoClipVithoutText = ({
  currentDuration,
  downloadLink,
  startTime,
  finishTime,
}: any) => {
  return [
    {
      asset: {
        type: 'video',
        src: downloadLink,
        trim: startTime,
      },
      start: currentDuration,
      length: finishTime - startTime,
      fit: 'cover',
      position: 'center',
      scale: 0.8,
      transition: {
        in: 'fade',
        out: 'fade',
      },
    },
  ];
};

export const makeBackground = ({
  currentDuration,
  fileName,
  downloadLink,
  startTime,
  finishTime,
}: any) => {
  return {
    asset: {
      type: 'video',
      src: downloadLink,
    },
    start: currentDuration + VIDEO_TITLEDURATION,
    length: finishTime - startTime,
    fit: 'cover',
    position: 'center',
    transition: {
      in: 'fade',
      out: 'fade',
    },
  };
};

export const makeAudioToVideo0 = ({
  currentDuration,
  downloadLink,
  startTime,
  finishTime,
}: any) => {
  return {
    asset: {
      type: 'audio',
      src: downloadLink,
      trim: startTime,
    },
    start: currentDuration,
    length: finishTime - startTime,
  };
};

export const makeBackground0 = ({
  currentDuration,
  fileName,
  downloadLink,
  startTime,
  finishTime,
}: any) => {
  return {
    asset: {
      type: 'video',
      src: downloadLink,
    },
    start: currentDuration,
    length: finishTime - startTime,
    fit: 'cover',
    position: 'center',
    transition: {
      in: 'fade',
      out: 'fade',
    },
  };
};

export const makeAudioToVideo = ({ currentDuration, downloadLink, startTime, finishTime }: any) => {
  return {
    asset: {
      type: 'audio',
      src: downloadLink,
      trim: startTime,
    },
    start: currentDuration + VIDEO_TITLEDURATION,
    length: finishTime - startTime,
  };
};

export const makeMusic = ({ downloadLink, finishTime }: any) => {
  return {
    asset: {
      type: 'audio',
      src: downloadLink,
    },
    start: 0,
    volume: 0.3,
    length: finishTime,
  };
};

export const makeBackgroundJson = (finishTime: number, backgroundUrl: string) => {
  return {
    asset: {
      type: 'image',
      src: backgroundUrl,
    },
    start: 0,
    length: finishTime,
  };
};
