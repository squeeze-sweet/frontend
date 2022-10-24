import axios from 'axios';
export interface API {
  postFile: (audio: any) => any; //Публикация новой аудио записи
  deleteFile: (id: string) => any; //Получение доступных аудио записей
  getAudioList: () => any; //Получение доступных аудио записей
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
    'Content-Type': 'multipart/form-data',
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
};

export default api;

/*var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic dGVzdGVyQHRlc3QucnU6dGVzdA==');

    var formdata = new FormData();
    formdata.append('file', file, '/C:/Users/alexa/Downloads/NЮ - Некуда Бежать.mp3');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://localhost:8000/api/v1/admin/files', requestOptions as any)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };*/
