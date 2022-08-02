import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import API from '../services/api/api';
import yandexDiskApi, { downloadconfigFile, uploadVideo } from '../services/api/api-yandex-disk';
import shotStackApi, { uploadOnShotStack } from '../services/api/api-shotstack';
import docsApi from '../services/api/api-docs';
import { STATUSES } from '../services/types';
import {
  makeAudioToVideo,
  makeClipJsonForTitlePage,
  makeMusic,
  makePremadeVideoClip,
  makeVideoClip,
} from './helpers';
import { PREMADE_VIDEO_DURATION, TITLE_VIDEO_DURATION, VIDEO_TITLEDURATION } from './constants';
import { StepData } from '../utils/types';

type File = {
  data: string;
  src: string;
  duration: number;
};

type UserInfo = {
  firstName: string;
  lastName: string;
  jobTitle: string;
};

interface Store {
  currentStepData: any;
  setCurrentStepData: any /* (stepsData: any) => void */;
  switchCurrentStep: any /* (fragmentName: any) => void */;

  email: string;
  setEmail: (email: string) => void;

  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  stepsData: any;
  initStepsData: () => void;

  updateStepsData: (fragmentName: any, data: any) => void;

  setStepsData: (stepsData: StepData[]) => void;

  questions: { number: number; text: string }[];
  setQuestions: () => void;

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
  uploadVideo: () => void;
  tracks: any;
  currentDuration: number;
  addClipNameAndTitle: (name: string, title: string) => void;
  addVideo: (name: string, title: string) => void;
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
  persist(
    devtools((set, get) => ({
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

      questions: [],

      setQuestions: async () => {
        const questions: string[] = await downloadconfigFile();
        set(
          {
            questions: questions.map((question: string, index: number) => ({
              number: index,
              text: question,
            })),
          },
          false,
          'selectQuestions',
        );
      },

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

      initStepsData: async () => {
        const questions: string[] = await downloadconfigFile();
        const stepsData: any = {};
        questions.forEach(
          (question: string) =>
            (stepsData[question] = {
              fragmentData: '',
              fragmentStartTime: 0,
              fragmentFinishTime: 0,
              videoPreviewSrc: '',
            }),
        );
        set({
          stepsData: stepsData,
        });
      },

      updateStepsData: (fragmentName, data) => {
        set(
          state => ({
            stepsData: {
              ...state.stepsData,
              [fragmentName]: data,
            },
            /*             currentStepData: {
              fragmentData: '',
              fragmentStartTime: 0,
              fragmentFinishTime: 0,
              videoPreviewSrc: '',
            }, */
          }),
          false,
          'update steps data',
        );
      },

      setStepsData: stepsData => {},

      filenames: [],
      setFilenames: (filenames: any) => {
        set({ filenames: filenames });
        set({ currentFragmentName: filenames[0] });
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
        set(state => ({
          tracks: {
            ...state.tracks,
            mainClips: [
              ...state.tracks.mainClips,
              makeClipJsonForTitlePage(name, title, get().currentDuration),
            ],
          },
          currentDuration: state.currentDuration + TITLE_VIDEO_DURATION,
        }));
      },

      addVideo: (name, title) => {
        set(state => ({
          tracks: {
            ...state.tracks,
            mainClips: [
              ...state.tracks.mainClips,
              makeClipJsonForTitlePage(name, title, get().currentDuration),
            ],
          },
          currentDuration: state.currentDuration + TITLE_VIDEO_DURATION,
        }));
      },

      createVideo: async () => {
        set({ status: STATUSES.fetching });
        const uploadAndSaveUrl = async (name: string, data: any) => {
          const downloadLink = await uploadVideo(name, data);
          console.log('downloadLink', downloadLink);
          /*         return { filename: name, downloadLink: downloadLink }; */
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

        try {
          const fileNames = get().filenames;
          const mainTrackData = get().stepsData;

          fileNames.forEach((fileName: string) => {
            uploadAndSaveUrl(fileName, mainTrackData[fileName].fragmentData);
          });
          //-----------------------------------
          /*         shotStackApi.render(requestData);  */
          set({ status: STATUSES.success });
        } catch (error: unknown) {
          set({ status: STATUSES.failure });
          console.log('creating video error', error);
        }
      },

      uploadVideo: async () => {
        set({ status: STATUSES.fetching });
        try {
          const fileNames = get().filenames;
          const mainTrackData = get().stepsData;

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

          fileNames.forEach((fileName: string) => {
            mainClips = [
              ...mainClips,
              ...makeVideoClip({
                currentDuration: currentDuration,
                fileName,
                downloadLink: mainTrackData[fileName].downloadLink,
                startTime: mainTrackData[fileName].fragmentStartTime,
                finishTime: mainTrackData[fileName].fragmentFinishTime,
              }),
            ];
            audiosClips = [
              ...audiosClips,
              makeAudioToVideo({
                currentDuration: currentDuration,
                downloadLink: mainTrackData[fileName].downloadLink,
                startTime: mainTrackData[fileName].fragmentStartTime,
                finishTime: mainTrackData[fileName].fragmentFinishTime,
              }),
            ];
            currentDuration +=
              Number(
                get().stepsData[get().filenames[get().filenames.length - 1]].fragmentFinishTime,
              ) -
              Number(
                get().stepsData[get().filenames[get().filenames.length - 1]].fragmentStartTime,
              ) +
              VIDEO_TITLEDURATION;
          });

          const finalLength =
            currentDuration; /*  + mainClips[0].fragmentFinishTime - mainClips[0].fragmentStartTime */

          const musicClips = [
            makeMusic({
              downloadLink: get().musicLink,
              finishTime: finalLength,
            }),
          ];

          //-----------------------------------
          //set data for SHOTSTACK
          //-----------------------------------

          //-----------------------------------
          /*           uploadOnShotStack(requestData) */

          const requestData = {
            timeline: {
              tracks: [
                {
                  clips: mainClips,
                },
                {
                  clips: audiosClips,
                },
                {
                  clips: musicClips,
                },
              ],
            },
            output: {
              format: 'mp4',
              resolution: 'sd',
            },
          };

          console.log('requestData', requestData);

          uploadOnShotStack(requestData);
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
  ),
);

/*
        
        console.log('finalResponse', finalResponse);
        //set({ finishUrl: response1.data.url });
*/
