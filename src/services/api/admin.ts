import axios from 'axios';
export interface API {
  postFile: (audio: any) => any; //Публикация новой аудио записи
  deleteFile: (id: string) => any; //Удаление фала
  getAudios: () => Promise<any>; //Получение доступных аудио записей
  getVideos: () => Promise<{ data: any }>; //Получение доступных аудио записей
  getWhiteList: () => any; //Получение доступных аудио записей
  addWhiteListUser: (email: string) => any;
  getQuestions: () => any;
}

function authenticateUser(user: string, password: string) {
  var token = user + ':' + password;
  var hash = btoa(token);
  return 'Basic ' + hash;
}

const client = axios.create({
  baseURL: 'https://1ce4-94-140-143-181.eu.ngrok.io/api/v1',
  timeout: 10000,
  headers: {
    Authorization: `${authenticateUser('tester@test.ru', 'test')}`,
  },
});

const api: API = {
  getAudios: async () => client.get('/files?content-type=audio'),
  getQuestions: async () => client.get('/categories'),
  getWhiteList: async () => client.get(`/admin/users`),
  getVideos: async () => client.get('/files?content-type=video'),
  postFile: file => {
    const formData = new FormData();
    formData.append('file', file);
    var requestOptions = {
      method: 'POST',
      headers: { Authorization: 'Basic dGVzdGVyQHRlc3QucnU6dGVzdA==' },
      body: formData,
    };
    return fetch('1ce4-94-140-143-181.eu.ngrok.io/api/v1/admin/files', requestOptions as any);
  },
  deleteFile: async id => client.delete(`/admin/files/${id}`),
  addWhiteListUser: async (email: string) => client.post(`/admin/white-list`, { email: email }),
};

export default api;
