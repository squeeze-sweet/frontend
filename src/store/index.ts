import create from 'zustand';
import { devtools } from 'zustand/middleware';
import API from '../services/api/api';
import yandexDiskApi, { uploadVideo } from '../services/api/api-yandex-disk';
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
  setFilenames: (filenames: any) => void;

  filesInfo: any[];
  uploadFile: ({ fileName, fileDuration }: any) => void;

  status: STATUSES;
  setStatus: (status: STATUSES) => void;

  links: string[];
  downloadLinks: any[];
  files: any[];
  finishUrl: string;
  finishId: string;

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
        set({ status: STATUSES.success });
      } catch (error: unknown) {
        set({ status: STATUSES.failure });
        console.log('upload error', error);
      }
    },

    status: STATUSES.initial,

    setStatus: status => set({ status: status }),

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
