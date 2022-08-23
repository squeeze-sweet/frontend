import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import API from '../services/api/api';
import yandexDiskApi, { uploadVideo } from '../services/api/api-yandex-disk';
import shotStackApi, { uploadOnShotStack } from '../services/api/api-shotstack';
import docsApi from '../services/api/api-docs';
import { STATUSES } from '../services/types';
import {
  makeAudioToVideo,
  makeBackground,
  makeBackgroundJson,
  makeClipJsonForTitlePage,
  makeMusic,
  makePremadeVideo,
  makePremadeVideoClip,
  makeVideoClip,
} from './helpers';
import { PREMADE_VIDEO_DURATION, TITLE_VIDEO_DURATION, VIDEO_TITLEDURATION } from './constants';
import { isEmptyObject } from '../utils/helpers';

type UserInfo = {
  firstName: string;
  lastName: string;
  jobTitle: string;
};

interface StepData {
  fragmentName?: {
    fragmentData: any;
    fragmentStartTime: number;
    fragmentFinishTime: number;
    videoPreviewSrc: string;
  };
}

interface Store {
  currentStepData: any;
  setCurrentStepData: any /* (stepsData: any) => void */;
  switchCurrentStep: any /* (fragmentName: any) => void */;

  preloaderText: string;
  setPreloaderText: (text: string) => void;

  email: string;
  setEmail: (email: string) => void;

  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  stepsData: any;
  initStepsData: (questions: { heading: string; description: string }[]) => void;

  updateStepsData: (fragmentName: any, data: any) => void;
  resetStepData: (fragmentName: any, data: any) => void;

  setStepsData: (stepsData: StepData[]) => void;

  filenames: any[];
  setFilenames: (filenames: any) => void;
  currentFragmentName: string;
  setCurrentFragmentName: (currentFragmentName: any) => void;
  currentFragmentDescription: string;
  setCurrentFragmentDescription: (currentFragmentName: any) => void;
  filesInfo: any[];
  /*   uploadFile: ({ fileName, fileDuration }: any) => void; */

  musicLink: string;
  getMusicLink: (fileName: any) => void;

  status: STATUSES;
  setStatus: (status: STATUSES) => void;

  finishUrl: string;

  setFinishUrl: (finishUrl: string) => void;
  createVideo: () => void;
  tracks: any;
  currentDuration: number;
  addClipNameAndTitle: (name: string, title: string) => void;
  links: string[];
  downloadLinks: any[];
  files: any[];

  finishId: string;
  blobToDownload: any;
  /*   getFinalLink: () => void; */
}

const sum = (array: any, maxIndex: any) => {
  let sum = 0;
  if (maxIndex === 0) return 0;
  for (let index = 0; index < maxIndex; index++) {
    sum += array[index];
  }
  return sum;
};

export const useStore = create<Store>()(
  devtools((set, get) => ({
    blobToDownload: null,
    preloaderText: '',

    setPreloaderText: (text: string) =>
      set({ preloaderText: text }, false, `setPreloader to ${text}`),

    email: '',
    setEmail: async email => {
      set({ email: email }, false, 'setEmail');

      const {
        data: { href: introVideoLink },
      } = await yandexDiskApi.getDownloadLink('editor/', 'intro.mp4');

      set(
        state => ({
          tracks: {
            mainClips: [makePremadeVideo(introVideoLink)],
          },
          currentDuration: state.currentDuration + TITLE_VIDEO_DURATION,
        }),
        false,
        'add intro video',
      );
    },

    userInfo: {
      firstName: '',
      lastName: '',
      jobTitle: '',
    },

    setUserInfo: userInfo => set({ userInfo: userInfo }, false, 'setUserInfo'),

    stepsData: {},

    currentStepData: {
      fragmentData: '',
      fragmentStartTime: 0,
      fragmentFinishTime: 0,
      videoPreviewSrc: '',
    },

    setCurrentStepData: (stepData: any) =>
      set({ currentStepData: stepData }, false, 'setCurrentStepData'),

    switchCurrentStep: (fragmentName: any) => {
      set(
        state => ({ currentStepData: { ...state.stepsData[fragmentName] } }),
        false,
        'switchCurrentStep',
      );
    },

    initStepsData: async questions => {
      const stepsData: any = {};
      if (isEmptyObject(get().stepsData)) {
        questions.forEach(
          ({ heading }) =>
            (stepsData[heading] = {
              fragmentData: '',
              fragmentStartTime: 0,
              fragmentFinishTime: 0,
              videoPreviewSrc: '',
            }),
        );
        set(
          {
            stepsData: stepsData,
          },
          false,
          'init steps data',
        );
      }
    },

    updateStepsData: (fragmentName, data) => {
      set(
        state => ({
          stepsData: {
            ...state.stepsData,
            [fragmentName]: data,
          },
        }),
        false,
        'update steps data',
      );
    },

    resetStepData: (fragmentName, data) => {
      set(
        state => ({
          stepsData: {
            ...state.stepsData,
            [fragmentName]: {
              fragmentData: '',
              fragmentStartTime: 0,
              fragmentFinishTime: 0,
              videoPreviewSrc: '',
            },
          },
        }),
        false,
        'reset step data',
      );
    },

    setStepsData: stepsData => {},

    filenames: [],
    setFilenames: (filenames: any) => {
      set({ filenames: filenames });
      set({ currentFragmentName: filenames[0] }, false, 'set chosen filenames');
    },

    currentFragmentName: '',
    currentFragmentDescription: '',

    setCurrentFragmentName: (currentFragmentName: any) =>
      set({ currentFragmentName: currentFragmentName }, false, 'setCurrentFragmentName'),

    setCurrentFragmentDescription: (currentFragmentDescription: any) =>
      set(
        { currentFragmentDescription: currentFragmentDescription },
        false,
        'setCurrentFragmentDescription',
      ),

    filesInfo: [],

    /*   uploadFile: async ({ fileName, fileData, videoDuration, startTime, finishTime }: any) => {
      set({ status: STATUSES.fetching });
      try {
        const downloadLink = await uploadVideo(fileName, fileData);
        set({
          filesInfo: [
            ...get().filesInfo,
            { fileName, downloadLink, videoDuration, startTime, finishTime },
          ],
        });
        set(state => ({
          tracks: {
            ...state.tracks,
            mainClips: [
              ...state.tracks.mainClips,
              ...makeVideoClip({
                currentDuration: get().currentDuration,
                fileName,
                downloadLink,
                startTime,
                finishTime,
              }),
            ],
            audiosClips: [
              ...state.tracks.audiosClips,
              makeAudioToVideo({
                currentDuration: get().currentDuration,
                downloadLink,
                startTime,
                finishTime,
              }),
            ],
          },
          currentDuration: state.currentDuration + finishTime - startTime + VIDEO_TITLEDURATION,
        }));

        set({ status: STATUSES.success });
      } catch (error: unknown) {
        set({ status: STATUSES.failure });
        console.log('upload error', error);
      }
    }, */

    status: STATUSES.initial,

    setStatus: status => set({ status: status }),

    currentDuration: PREMADE_VIDEO_DURATION,

    tracks: {
      mainClips: [
        /* makePremadeVideoClip() */
      ],
      audiosClips: [],
      audioTrackClips: [],
    },

    addClipNameAndTitle: (name, title) => {
      set(
        state => ({
          tracks: {
            ...state.tracks,
            mainClips: [
              ...state.tracks.mainClips,
              makeClipJsonForTitlePage(name, title, get().currentDuration),
            ],
          },
          currentDuration: state.currentDuration + TITLE_VIDEO_DURATION,
        }),
        false,
        'add text and title to json',
      );
    },

    createVideo: async () => {
      set({ status: STATUSES.fetching });
      const fileNames = get().filenames;
      const mainTrackData = get().stepsData;
      // загружаем фрагменты на диск и получаем ссылки на скачивание.
      const uploadQueries: any[] = [];
      fileNames.forEach((fileName: string) => {
        uploadQueries.push(
          uploadVideo(get().email, fileName, mainTrackData[fileName].fragmentData),
        );
      });
      const downloadLinks = await Promise.all(uploadQueries);

      try {
        //-----------------------------
        let mainClips: any[] = [];
        let audiosClips: any[] = [];
        let backgrounds: any[] = [];
        let currentDuration = 10; //TODO Убрать хардкод

        const {
          data: { href: introVideoLink },
        } = await yandexDiskApi.getDownloadLink('editor/', 'intro.mp4');

        //-----------------------------------------------Скачиваю фоновые видео
        const bgUrls = await Promise.all([
          yandexDiskApi.getDownloadLink('editor/', 'bg1.mp4'),
          yandexDiskApi.getDownloadLink('editor/', 'bg2.mp4'),
          yandexDiskApi.getDownloadLink('editor/', 'bg3.mp4'),
        ]);
        console.log('bgUrls', bgUrls);

        fileNames.forEach((fileName: string) => {
          uploadQueries.push(
            uploadVideo(get().email, fileName, mainTrackData[fileName].fragmentData),
          );
        });

        mainClips = [
          ...makePremadeVideo(introVideoLink),
          makeClipJsonForTitlePage(
            get().userInfo?.firstName + ' ' + get().userInfo?.lastName,
            get().userInfo?.jobTitle as any,
            5,
          ),
        ];

        fileNames.forEach((fileName: string, index: number) => {
          mainClips = [
            ...mainClips,
            ...makeVideoClip({
              currentDuration: currentDuration,
              fileName,
              downloadLink: downloadLinks[index],
              startTime: mainTrackData[fileName].fragmentStartTime,
              finishTime: mainTrackData[fileName].fragmentFinishTime,
            }),
          ];
          audiosClips = [
            ...audiosClips,
            makeAudioToVideo({
              currentDuration: currentDuration,
              downloadLink: downloadLinks[index],
              startTime: mainTrackData[fileName].fragmentStartTime,
              finishTime: mainTrackData[fileName].fragmentFinishTime,
            }),
          ];
          backgrounds = [
            ...backgrounds,
            makeBackground({
              currentDuration: currentDuration,
              downloadLink: bgUrls.map(bgdata => bgdata.data.href)[index % bgUrls.length],
              startTime: mainTrackData[fileName].fragmentStartTime,
              finishTime: mainTrackData[fileName].fragmentFinishTime,
            }),
          ];

          currentDuration +=
            mainTrackData[fileName].fragmentFinishTime -
            mainTrackData[fileName].fragmentStartTime +
            VIDEO_TITLEDURATION;
        });

        const finalLength =
          currentDuration +
          Number(get().stepsData[get().filenames[get().filenames.length - 1]].fragmentFinishTime) -
          Number(get().stepsData[get().filenames[get().filenames.length - 1]].fragmentStartTime);

        const {
          data: { href: backgroundUrl },
        } = await yandexDiskApi.getDownloadLink('editor/', 'background.jpg');
        const imageClip = [makeBackgroundJson(finalLength, backgroundUrl)];

        const requestData = {
          timeline: {
            soundtrack: {
              src: get().musicLink,
              effect: 'fadeIn',
              volume: 0.05,
            },
            tracks: [
              {
                clips: mainClips,
              },
              {
                clips: audiosClips,
              },
              {
                clips: backgrounds,
              },
              {
                clips: imageClip,
              },
            ],
          },
          output: {
            format: 'mp4',
            resolution: 'sd',
          },
        };

        set({ preloaderText: 'Rendering' }, false, `setPreloader to 'Rendering'`);
        const {
          data: {
            response: { id },
          },
        } = await shotStackApi.render(requestData);

        const forceDownload = (blob: any, filename: any) => {
          var a = document.createElement('a');
          a.download = filename;
          a.href = blob;
          // For Firefox https://stackoverflow.com/a/32226068
          document.body.appendChild(a);
          a.click();
          a.remove();
        };

        // Current blob size limit is around 500MB for browsers
        const downloadResource = async (url: any) => {
          const response = await fetch(url, {
            headers: new Headers({
              Origin: location.origin,
            }),
            mode: 'cors',
          });

          const arrayBuffer = await response.arrayBuffer();
          /*           const blob = await response.blob();
          console.log('blob', blob); */

          uploadVideo(get().email, 'result', arrayBuffer);
          /*               let blobUrl = window.URL.createObjectURL(await res.blob);
              forceDownload(blobUrl, filename); */

          /* set({ blobToDownload: res.blob }); */

          /*     .then(blob => {
              console.log('blob', blob);
        
              let blobUrl = window.URL.createObjectURL(blob);
              forceDownload(blobUrl, filename);
            }) */
        };

        const QueryUntillData = async () => {
          return setTimeout(async () => {
            const {
              data: {
                response: { url },
              },
            } = await shotStackApi.getVideoStatus(id);
            if (url) {
              set({ finishUrl: url });
              shotStackApi.download(url);
              set({ preloaderText: 'saving video' });
              const data = await downloadResource(url);
            } else QueryUntillData();
          }, 5000);
        };

        QueryUntillData();

        set({ status: STATUSES.success });
      } catch (error: unknown) {
        set({ status: STATUSES.failure });
      }
    },

    links: [],
    downloadLinks: [],
    files: [],
    finishId: '',
    finishUrl: '',

    setFinishUrl: finishUrl => {
      set({ finishUrl: finishUrl });
    },

    musicLink: '',

    getMusicLink: async fileName => {
      /* set({ status: STATUSES.fetching });
      const response = await yandexDiskApi.getDownloadLink('editor/', `${fileName}.mp3`); */
      set(state => ({
        tracks: {
          ...state.tracks,
          audioTrackClips: [
            makeAudioToVideo({
              currentDuration: 0,
              downloadLink: fileName,
              startTime: 0,
              finishTime: 0,
            }),
          ],
        },
        currentDuration: 0,
      }));

      set({ musicLink: fileName });
      set({ status: STATUSES.success });
    },
  })),
);
