import axios, { AxiosResponse } from 'axios';

//Очень плохо, токены так не хранят
const token = 'AQAAAABXo1nYAAfi9NW9crs7YE-biO-y3vpjHOg';

export interface API {
  getUploadLink: (fileName: string) => any;
  uploadFile: (link: string, file: any) => any;
  getDownloadLink: (fileName: string) => any;
  downloadFile: (link: string) => any;
}

const api: API = {
  getUploadLink: async (fileName: string) =>
    await axios.get(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=videosamples%2F${fileName}&overwrite=true`,
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
  getDownloadLink: async (fileName: string) =>
    await axios.get(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=videosamples%2F${fileName}`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ),
  downloadFile: async (link: string) =>
    await axios.get(link, {
      headers: {
        Authorization: `OAuth ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }),
};

export default api;

export const downloadconfigFile = async () => {
  const {
    data: { href: href },
  } = await api.getDownloadLink('config.json');
  const {
    data: { questions: questions },
  } = await api.downloadFile(href);
  return questions;
};

export const uploadVideo = async (fileName: string, fileData: any) => {
  const {
    data: { href: uploadLink },
  } = await api.getUploadLink(fileName);
  await api.uploadFile(uploadLink, fileData);
  const {
    data: { href: downloadLink },
  } = await api.getDownloadLink(fileName);
  return downloadLink;
};

