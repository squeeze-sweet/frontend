import axios from 'axios';
import { useStore } from '../../store';

export interface API {
  getDocs: (token: string) => any; //Получение массива документов
  postDocs: (token: string, data: any) => any; //Публикация нового документа
  putDoc: (token: string, id: string, data: any) => any; //Обновление документа
  //getDocJson: (token: string) => any; //Получение json документа для отрисовки в swagger
  //putDocJson: (token: string) => any; //Получение json документа для отрисовки в swagger
}

const api: API = {
  getDocs: (token: string) =>
    axios.get('https://docs.sima.team/api/v1/docs', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }),
  postDocs: (token: string, { name, version, doc_json }: any) =>
    axios.post(
      'https://docs.sima.team/api/v1/docs',
      { name: name, version: version, doc_json: doc_json },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ),
  putDoc: (token: string, id: string, { name, version, doc_json }: any) =>
    axios.put(
      `https://docs.sima.team/api/v1/docs/${id}`,
      { name: name, version: version, doc_json: doc_json },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ),
};

export default api;
