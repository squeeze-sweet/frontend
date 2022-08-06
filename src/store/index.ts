import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import API from '../services/api/api';
import yandexDiskApi, { downloadconfigFile, uploadVideo } from '../services/api/api-yandex-disk';
import shotStackApi, { uploadOnShotStack } from '../services/api/api-shotstack';
import docsApi from '../services/api/api-docs';
import { STATUSES } from '../services/types';
import {
  makeAudioToVideo,
  makeBackgroundJson,
  makeClipJsonForTitlePage,
  makeMusic,
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
  initStepsData: (questions: string[]) => void;

  updateStepsData: (fragmentName: any, data: any) => void;
  resetStepData: (fragmentName: any, data: any) => void;

  setStepsData: (stepsData: StepData[]) => void;

  filenames: any[];
  setFilenames: (filenames: any) => void;
  currentFragmentName: string;
  setCurrentFragmentName: (currentFragmentName: any) => void;

  filesInfo: any[];
  uploadFile: ({ fileName, fileDuration }: any) => void;

  musicLink: string;
  getMusicLink: (fileName: any) => void;

  status: STATUSES;
  setStatus: (status: STATUSES) => void;

  finishUrl: string;

  createVideo: () => void;
  tracks: any;
  currentDuration: number;
  addClipNameAndTitle: (name: string, title: string) => void;
  links: string[];
  downloadLinks: any[];
  files: any[];

  finishId: string;

  getFinalLink: () => void;
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
    preloaderText: '',

    setPreloaderText: (text: string) =>
      set({ preloaderText: text }, false, `setPreloader to ${text}`),

    email: '',
    setEmail: email => {
      set({ email: email }, false, 'setEmail');
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
          (question: string) =>
            (stepsData[question] = {
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

    setCurrentFragmentName: (currentFragmentName: any) =>
      set({ currentFragmentName: currentFragmentName }, false, 'setCurrentFragmentName'),

    filesInfo: [],

    uploadFile: async ({ fileName, fileData, videoDuration, startTime, finishTime }: any) => {
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
    },

    status: STATUSES.initial,

    setStatus: status => set({ status: status }),

    currentDuration: PREMADE_VIDEO_DURATION,

    tracks: {
      mainClips: [makePremadeVideoClip()],
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
      const uploadAndSaveUrl = async (name: string, data: any) => {
        const downloadLink = await uploadVideo(name, data);
        set(
          {
            stepsData: {
              ...get().stepsData,
              [name]: {
                ...get().stepsData[name],
                downloadLink: downloadLink,
              },
            },
          },
          false,
          'uploadAndSaveUrl',
        );
      };
      const fileNames = get().filenames;
      const mainTrackData = get().stepsData;
      // загружаем фрагменты на диск и получаем ссылки на скачивание.
      const uploadQueries: any[] = [];
      fileNames.forEach((fileName: string) => {
        uploadQueries.push(uploadVideo(fileName, mainTrackData[fileName].fragmentData));
      });
      const downloadLinks = await Promise.all(uploadQueries);

      try {
        //-----------------------------
        let mainClips: any[] = [];
        let audiosClips: any[] = [];
        let currentDuration = TITLE_VIDEO_DURATION;

        mainClips = [
          makeClipJsonForTitlePage(
            get().userInfo?.firstName + ' ' + get().userInfo?.lastName,
            get().userInfo?.jobTitle as any,
            0,
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

          currentDuration +=
            mainTrackData[fileName].fragmentFinishTime -
            mainTrackData[fileName].fragmentStartTime +
            VIDEO_TITLEDURATION;
        });

        const finalLength =
          currentDuration +
          Number(get().stepsData[get().filenames[get().filenames.length - 1]].fragmentFinishTime) -
          Number(get().stepsData[get().filenames[get().filenames.length - 1]].fragmentStartTime);

        const imageClip = [
          makeBackgroundJson({
            finishTime: finalLength,
          }),
        ];

        const requestData = {
          timeline: {
            soundtrack: {
              src: get().musicLink,
              effect: 'fadeIn',
              volume: 0.2,
            },
            tracks: [
              {
                clips: mainClips,
              },
              {
                clips: audiosClips,
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

        const {
          data: {
            response: { id },
          },
        } = await shotStackApi.render(requestData);

        const QueryUntillData = async () => {
          return setTimeout(async () => {
            const {
              data: {
                response: { url },
              },
            } = await shotStackApi.getVideoStatus(id);
            if (url) {
              set({ finishUrl: url });
            } else QueryUntillData();
          }, 5000);
        };

        QueryUntillData();

        /*           console.log('FINISH url', url); */

        /*           set({ finishUrl: response.data.response.url }); */
        /*           shotStackApi.render(requestData); */

        set({ status: STATUSES.success });
      } catch (error: unknown) {
        set({ status: STATUSES.failure });
        console.log('creating video error', error);
      }
    },

    links: [],
    downloadLinks: [],
    files: [],
    finishId: '',
    finishUrl: '',

    /*
        \"clips": [
          {
            "asset": {
              "type": "video",
              "src": "https://downloader.disk.yandex.ru/disk/4e4afbd0271bace8ae90bc8d584b3563815c4268b2006c6735acf16c4aeb8e0c/62c54a17/8_WUTPzIXosyqU0TknxfgtTKot0z8-Zv2wNO95T6Fmc3jDFqcElgtBt7YJEGl3dzNp6tN0gKYVimiVspuWOL-w%3D%3D?uid=1470323160&filename=videoplayback.mp4&disposition=attachment&hash=&limit=0&content_type=video%2Fmp4&owner_uid=1470323160&fsize=45921&hid=dfb1c2488611f27cb7a4aba2ff2efb22&media_type=video&tknv=v2&etag=f15f80b5729df453bc4b06b7d1f608ac"
              "trim": startTime,
            },
            "start": 0,
            "length": videoLength-videoStartTime
          }
        ]
      },
    */

    getFinalLink: async () => {
      //set({ status: STATUSES.fetching });
      const response = await shotStackApi.getVideoStatus(get().finishId);
      //console.log('response!!!!', resultResponse);
      set({ finishUrl: response.data.response.url });
      set({ status: STATUSES.success });
    },

    musicLink: '',

    getMusicLink: async fileName => {
      set({ status: STATUSES.fetching });
      const response = await yandexDiskApi.getDownloadLink(`${fileName}.mp3`);
      set(state => ({
        tracks: {
          ...state.tracks,
          audioTrackClips: [
            makeAudioToVideo({
              currentDuration: 0,
              downloadLink: response.data.href,
              startTime: 0,
              finishTime: 0,
            }),
          ],
        },
        currentDuration: 0,
      }));

      set({ musicLink: response.data.href });
      set({ status: STATUSES.success });
    },
  })),
);

/*
        
        console.log('finalResponse', finalResponse);
        //set({ finishUrl: response1.data.url });
*/
