import axios from 'axios';
export interface API {
  postFile: (audio: any) => any; //Публикация новой аудио записи
  deleteFile: (id: string) => any; //Удаление аудиозаписи
  getAudioList: () => any; //Получение доступных аудио записей
  getWhiteList: () => any; //Получение доступных аудио записей
  addWhiteListUser: (email: string) => any;
}

function authenticateUser(user: string, password: string) {
  var token = user + ':' + password;
  var hash = btoa(token);
  return 'Basic ' + hash;
}

const client = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    Authorization: `${authenticateUser('tester@test.ru', 'test')}`,
  },
});

console.log(authenticateUser('tester@test.ru', 'test'));

const api: API = {
  getAudioList: async () => client.get('/files?content-type=audio'),
  postFile: file => {
    const formData = new FormData();
    formData.append('file', file);
    var requestOptions = {
      method: 'POST',
      headers: { Authorization: 'Basic dGVzdGVyQHRlc3QucnU6dGVzdA==' },
      body: formData,
    };
    return fetch('http://localhost:8000/api/v1/admin/files', requestOptions as any);
  },
  deleteFile: async id => client.delete(`/admin/files/${id}`),
  getWhiteList: async () => client.get(`/admin/users`),
  addWhiteListUser: async (email: string) => client.post(`/admin/white-list`, { email: email }),
};

export default api;
