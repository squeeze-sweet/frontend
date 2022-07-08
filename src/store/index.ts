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

  finishUrl: string;
  createVideo: () => void;

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

    createVideo: async () => {
      set({ status: STATUSES.fetching });
      try {
        const fragmentsData = get().filesInfo;
        console.log(fragmentsData);

        const fragmentsDurations = fragmentsData.map(
          ({ startTime, finishTime }: any) => finishTime - startTime,
        );
        /*         console.log('fragmentsDurations', fragmentsDurations); */

        const clips = fragmentsData.map(
          ({ fileName, downloadLink, startTime, finishTime }: any, index: any) => {
            return {
              asset: {
                type: 'video',
                src: downloadLink,
                trim: startTime,
              },
              start: sum(fragmentsDurations, index) + 3 * (index + 1),
              length: finishTime - startTime,
              transition: {
                in: 'fade',
                out: 'fade',
              },
            };
          },
        );

        /*               {
                asset: {
                  type: 'html',
                  html: "<p class='name'>" + fileName + '</p>',
                  css: "p { font-family: 'Montserrat ExtraBold'; color: #ffffff; font-size: 40px; }",
                },
                transition: {
                  in: 'slideLeft',
                  out: 'slideRight',
                },
                start: sum(fragmentsDurations, index) + Math.floor((index + 1) / 2) * 3,
                length: 3,
              }, */

        const requestData = {
          timeline: {
            tracks: [
              {
                clips: clips,
              },
            ],
          },
          output: {
            format: 'mp4',
            resolution: 'sd',
          },
        };
        console.log('clips', clips);
        console.log('requestData', JSON.stringify(requestData));

        shotStackApi.render(requestData);

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
  })),
);

/*
        
        console.log('finalResponse', finalResponse);
        //set({ finishUrl: response1.data.url });
*/
