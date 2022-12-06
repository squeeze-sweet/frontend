import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { QuestionsAndCategories } from './types';
import api from '../services/api/admin';
import yandexDiskApi, { uploadVideo } from '../services/api/api-yandex-disk';
import shotStackApi, { uploadOnShotStack } from '../services/api/api-shotstack';
import docsApi from '../services/api/api-docs';
import { STATUSES } from '../services/types';
import {
  makeAudioToVideo,
  makeAudioToVideo0,
  makeBackground,
  makeBackground0,
  makeBackgroundJson,
  makeClipJsonForTitlePage,
  makeMusic,
  makePremadeVideo,
  makeVideoClip,
  makeVideoClipVithoutText,
} from './helpers';
import { TITLE_VIDEO_DURATION, VIDEO_TITLEDURATION } from './constants';
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
    file?: any;
  };
}

interface Store {
  //language controll
  lang: 'en' | 'fr';
  setLang: (lang: 'en' | 'fr') => void;
  //-------------------------------------

  questionsAndCategories: QuestionsAndCategories | null;
  setQuestionsAndCategories: (data: QuestionsAndCategories) => void;

  email: string;
  setEmail: (email: string) => void;

  password: string;
  setPassword: (password: string) => void;

  audios: any[];
  getAudios: () => void;

  finalVideoData: any;
  mergeVideos: (files: any, meta: any) => void;

  currentStepData: any;
  setCurrentStepData: any /* (stepsData: any) => void */;
  switchCurrentStep: any /* (fragmentName: any) => void */;

  preloaderText: string;
  setPreloaderText: (text: string) => void;

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

  currentFragmentDescription: string;
  setCurrentFragmentDescription: (currentFragmentName: any) => void;

  filesInfo: any[];

  status: STATUSES;
  setStatus: (status: STATUSES) => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    lang: 'en',
    setLang: lang => {
      set({ lang: lang }, false, `setLang to ${lang}`);
    },

    questionsAndCategories: null,

    setQuestionsAndCategories: (data: any) =>
      set({ questionsAndCategories: data }, false, `setting questions and categories`),

    blobToDownload: null,
    preloaderText: '',

    setPreloaderText: (text: string) =>
      set({ preloaderText: text }, false, `setPreloader to ${text}`),

    email: '',
    setEmail: async email => {
      set({ email: email }, false, 'setEmail');
    },

    password: '',
    setPassword: async password => {
      set({ password: password }, false, 'setPassword');
    },

    audios: [],

    getAudios: async () => {
      const { data } = await api.getAudios(get().email, get().password);
      set({ audios: data }, false, 'set Audios');
    },

    finalVideoData: null,

    mergeVideos: async (files, meta) => {
      const { body } = await api
        .mergeVideos(files, meta, get().email, get().password)
        .then(({ body }) => new Response(body))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => set({ finalVideoData: url }, false, 'set finalVideoData'))
        .catch(err => console.error(err));
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
      length: 0,
      file: null,
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
      console.log('initStepsData');

      if (!get().stepsData?.length) {
        console.log('initStepsDataIF');
        const tempData: any = {};
        questions.forEach(
          question =>
            (tempData[question] = {
              fragmentData: '',
              fragmentStartTime: 0,
              fragmentFinishTime: 0,
              videoPreviewSrc: '',
              length: 0,
              file: null,
            }),
        );
        set(
          {
            stepsData: tempData,
          },
          false,
          'init steps data',
        );
      }
    },

    updateStepsData: (fragmentName, data) => {
      console.log('updateStepsData', data);

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
      set({ filenames: filenames }, false, 'set filenames');
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

    status: STATUSES.initial,

    setStatus: status => set({ status: status }),
  })),
);
