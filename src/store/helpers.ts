import { PREMADE_VIDEO_DURATION, TITLE_VIDEO_DURATION, VIDEO_TITLEDURATION } from './constants';

export const makePremadeVideoClip = () => {
  return {
    asset: {
      type: 'html',
      html: `<p class='name'>Pre-made video</p>`,
      css: ".name { font-family: 'Montserrat ExtraBold'; color: #ffffff; font-size: 30px; }",
    },
    transition: {
      in: 'fade',
      out: 'fade',
    },
    start: 0,
    length: PREMADE_VIDEO_DURATION,
  };
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
      transition: {
        in: 'fade',
        out: 'fade',
      },
    },
  ];
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
