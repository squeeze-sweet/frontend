import create from 'zustand';
import { devtools } from 'zustand/middleware';
import API from '../services/api/api';
import yandexDiskApi from '../services/api/api-yandex-disk';
import docsApi from '../services/api/api-docs';
import { STATUSES } from '../services/types';

interface Store {
  status: STATUSES;
  links: string[];
  file: any;
  files: any[];
  addFile: (file: any) => void;
  uploadFile: (fileName: string) => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    status: STATUSES.initial,
    links: [],
    files: [],
    file: null,
    addFile: (file: any) => {
      console.log('добавляется в стор:', file);
      set({ file: file });
    },

    uploadFile: async (fileName: string) => {
      set({ status: STATUSES.fetching });
      try {
        const response = await yandexDiskApi.getUploadLink(fileName);
        set({ links: [...get().links, response.data.href] });
        set({ status: STATUSES.success });
        set({ status: STATUSES.fetching });
        try {
          console.log('file', get().file);
          const response = await yandexDiskApi.uploadFile(get().links[0], get().file);
          set({ links: [...get().links, response.data.href] });
          set({ status: STATUSES.success });
        } catch (error: unknown) {
          set({ status: STATUSES.failure });
        }
      } catch (error: unknown) {
        set({ status: STATUSES.failure });
      }
    },
  })),
);
