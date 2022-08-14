import axios, { AxiosResponse } from 'axios';

//Очень плохо, токены так не хранят
const token = 'AQAAAABXo1nYAAfi9NW9crs7YE-biO-y3vpjHOg';
const rootFolder = 'editor';
export interface API {
  checkUserAcess: (email: string) => any;
  getUploadLink: (email: string, fileName: string) => any;
  uploadFile: (link: string, file: any) => any;
  getDownloadLink: (path: string, fileName: string) => any;
  /*   getDownlLink: (fileName: string) => any; */
  downloadFile: (link: string) => any;
  getFilesInfo: (path: string) => any;
}

const api: API = {
  checkUserAcess: async (email: string) =>
    await axios.get(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=${rootFolder}%2F${email}`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ),
  getUploadLink: async (email: string, fileName: string) =>
    await axios.get(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${rootFolder}%2F${email}%2F${fileName}&overwrite=true`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ),
  uploadFile: async (link: string, file: any) => {
    await axios.put(`${link}`, file, {
      headers: {
        'Content-Type': 'application/binary; charset=UTF-8',
      },
    });
  },
  getDownloadLink: async (path: string, fileName: string) =>
    await axios.get(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=${path}${fileName}`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ),
  getFilesInfo: async (path: string) =>
    await axios.get(`https://cloud-api.yandex.net/v1/disk/resources/?path=${path}&fields=items`, {
      headers: {
        Authorization: `OAuth ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }),

  /*     getDownlLink: async (fileName: string) =>
    await axios.get(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=videosamples%2F${fileName}`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ), */
  downloadFile: async (link: string) =>
    await axios.get(link, {
      headers: {
        Authorization: `OAuth ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }),
};

export default api;

/* export const downloadconfigFile = async () => {
  const {
    data: { href: href },
  } = await api.getDownloadLink('config.json');
  const {
    data: { questions: questions },
  } = await api.downloadFile(href);
  return questions;
};
 */
export const uploadVideo = async (email: string, fileName: string, fileData: any) => {
  const {
    data: { href: uploadLink },
  } = await api.getUploadLink(email, fileName);
  await api.uploadFile(uploadLink, fileData);
  const {
    data: { href: downloadLink },
  } = await api.getDownloadLink(`${rootFolder}/${email}/`, fileName);
  return downloadLink;
};
