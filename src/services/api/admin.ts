import axios from 'axios';
export interface API {
  getQuestions: (email: string, password: string) => any;
  getAudios: (email: string, password: string) => Promise<any>; //Получение доступных аудио записей
  postFile: (audio: any) => any; //Публикация новой аудио записи
  mergeVideos: (
    files: any,
    meta: any,
    chosenAudioId: string,
    email: string,
    password: string,
  ) => any; //Публикация новой аудио записи
  deleteFile: (id: string, email: string, password: string) => any; //Удаление фала
  getVideos: (email: string, password: string) => Promise<{ data: any }>; //Получение доступных аудио записей
  getWhiteList: (email: string, password: string) => any; //Получение доступных аудио записей
  addWhiteListUser: (newEail: string, email: string, password: string) => any;
  deleteWhiteListUser: (id: string, email: string, password: string) => any;
}

function authenticateUser(user: string, password: string) {
  var token = user + ':' + password;
  var hash = btoa(token);
  return 'Basic ' + hash;
}

const client = axios.create({
  baseURL: 'http://213.189.216.169/api/v1',
  timeout: 10000,
  headers: {
    Authorization: `${authenticateUser('tester@test.ru', 'test')}`,
  },
});

const api: API = {
  getQuestions: async (email, password) =>
    client.get('/categories', {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  getAudios: async (email, password) =>
    client.get('/files?content-type=audio', {
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  getWhiteList: async (email, password) =>
    client.get(`/admin/users`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  getVideos: async (email, password) =>
    client.get('/files?content-type=video', {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  postFile: file => {
    const formData = new FormData();
    formData.append('file', file);
    var requestOptions = {
      method: 'POST',
      headers: { Authorization: 'Basic dGVzdGVyQHRlc3QucnU6dGVzdA==' },
      body: formData,
    };
    return fetch('http://213.189.216.169/api/v1/admin/files', requestOptions as any);
  },
  mergeVideos: async (files, meta, chosenAudioId, email, password) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    formData.append('meta', meta);

    formData.append('soundtrack_id', chosenAudioId);
    chosenAudioId;
    var requestOptions = {
      method: 'POST',
      headers: { Authorization: `${authenticateUser(email, password)}` },
      body: formData,
    };
    console.log('meta', meta);
    return fetch('http://213.189.216.169/api/v1/merge-final-video', requestOptions as any);
  },
  deleteFile: async (id, email, password) =>
    client.delete(`/admin/files/${id}`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  addWhiteListUser: async (newEmail, email, password) =>
    client.post(
      `/admin/white-list`,
      { email: newEmail },
      {
        timeout: 10000,
        headers: {
          Authorization: `${authenticateUser(email, password)}`,
        },
      },
    ),
  deleteWhiteListUser: async (id, email, password) =>
    client.delete(`/admin/white-list/${id}`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
};

export default api;
