import axios from 'axios';
export interface API {
  postAudio: (audio: Blob) => any; //Публикация новой аудио записи
  getAudioList: () => any; //Получение доступных аудио записей
}

function authenticateUser(user: string, password: string) {
  var token = user + ':' + password;
  var hash = btoa(token);
  return 'Basic ' + hash;
}

const client = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 3000,
  headers: {
    Authorization: `${authenticateUser('tester@test.ru', 'test')}`,
  },
});

console.log(authenticateUser('tester@test.ru', 'test'));

const api: API = {
  getAudioList: () => client.get('http://localhost:8000/api/v1/files?content-type=audio'),
  postAudio: file => client.post('http://https://docs.sima.team/api/v1/docs', { file: file }),
};

export default api;
