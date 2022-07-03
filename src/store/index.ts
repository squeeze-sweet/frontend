import create from 'zustand';
import { devtools } from 'zustand/middleware';
import API from '../services/api/api';
import yandexDiskApi from '../services/api/api-yandex-disk';
import shotStackApi from '../services/api/api-shotstack';
import docsApi from '../services/api/api-docs';
import { STATUSES } from '../services/types';

type File = {
  data: string;
  src: string;
  duration: number;
};

type UserInfo = {
  firstName: string;
  lastName: string;
  jobTitle: string;
} | null;

interface Store {
  email: string | null;
  setEmail: (email: string) => void;

  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  filenames: any[];
  filesInfo: any[];
  status: STATUSES;
  links: string[];
  downloadLinks: any[];
  file: any;
  files: any[];
  finishUrl: string;
  finishId: string;

  setFilenames: (filenames: any) => void;
  addFile: (file: any) => void;
  uploadFile: ({ fileName, fileDuration }: any) => void;
  getDownloadLinks: () => void;
  getFinalLink: () => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    email: '',
    setEmail: email => {
      set({ email: email });
    },

    userInfo: null,
    setUserInfo: userInfo => set({ userInfo: userInfo }),

    filenames: [],
    setFilenames: (filenames: any) => {
      set({ filenames: filenames });
    },

    file: null,

    addFile: (file: any) => {
      console.log('добавляется в стор:', file);
      set({ file: file });
    },

    filesInfo: [],
    status: STATUSES.initial,
    links: [],
    downloadLinks: [],
    files: [],
    finishId: '',
    finishUrl: '',

    uploadFile: async ({ fileName /*,  fileDuration */ }: any) => {
      set({ status: STATUSES.fetching });
      try {
        const response = await yandexDiskApi.getUploadLink(fileName);
        /*         set({ filesInfo: [...get().filesInfo, { fileName, fileDuration }] }); */
        set({ links: [...get().links, response.data.href] });
        try {
          console.log('первый запрос');
          const links = get().links;
          const response1 = await yandexDiskApi.uploadFile(links[links.length - 1], get().file);
          //const response2 = await yandexDiskApi.getDownloadLink(fileName);
          //console.log('ссылка на скачивание', response2.data.href);
          set({ status: STATUSES.success });
        } catch (error: unknown) {
          set({ status: STATUSES.failure });
          console.log('uploadFileError');
        }
      } catch (error: unknown) {
        set({ status: STATUSES.failure });
        console.log('getUploadLinkError');
      }
    },

    getDownloadLinks: async () => {
      set({ status: STATUSES.fetching });
      try {
        const promises: any = [];

        get().filesInfo.map(fileInfo => {
          promises.push(yandexDiskApi.getDownloadLink(fileInfo.fileName));
        });

        const responses = await Promise.all(promises);
        responses.map(response => {
          set({
            downloadLinks: [
              ...get().downloadLinks,
              response.data.href,
            ] /*[firstResponse.data.href, secondResponse.data.href]*/,
          });
          console.log('response.data.href;', response.data.href);
        });
        /*
        const [firstResponse, secondResponse] = await Promise.all([
          await yandexDiskApi.getDownloadLink(get().filesInfo[0].fileName),
          await yandexDiskApi.getDownloadLink(get().filesInfo[1].fileName),
        ]);
        console.log('firstResponse', firstResponse);
        console.log('secondResponse', secondResponse);
*/
        const filesDurations = get().filesInfo.map(fileInfo => Math.floor(fileInfo.fileDuration));
        console.log('filesDurations', filesDurations);
        const response = await shotStackApi.render(get().downloadLinks, filesDurations);
        set({ finishId: response.data.response.id });
        //set({ status: STATUSES.success });
      } catch (error: unknown) {
        set({ status: STATUSES.failure });
        console.log('uploadFileError');
      }
    },
    getFinalLink: async () => {
      //set({ status: STATUSES.fetching });
      const response = await shotStackApi.getVideoStatus(get().finishId);
      //console.log('response!!!!', resultResponse);
      set({ finishUrl: response.data.response.url });
      set({ status: STATUSES.success });
    },
  })),
);

/*
        
        console.log('finalResponse', finalResponse);
        //set({ finishUrl: response1.data.url });
*/
