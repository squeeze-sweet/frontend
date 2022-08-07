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

export const makeBackgroundJson = ({ finishTime }: any) => {
  return {
    asset: {
      type: 'image',
      src: 'https://downloader.disk.yandex.ru/disk/ec27ebc88f3d2d120967bfa8466e8300a05b0e2afecebf4e4384e52b068a8659/62f03c47/27dtdWwpiHWAOMwjvJSigCdbkJ2sC_KEk2e_VtbYAOdr6rmRYtpbQYz3IVW_GnQTUp8cZpYb05BdYA_XdsnYOQ%3D%3D?uid=1470323160&filename=%D0%93%D0%BE%D1%80%D1%8B.jpg&disposition=attachment&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1470323160&fsize=1762478&hid=17e80f91be8985790b9b63a1ab6d29f2&media_type=image&tknv=v2&etag=1392851f0668017168ee4b5a59d66e7b',
    },
    start: 0,
    length: finishTime,
  };
};
