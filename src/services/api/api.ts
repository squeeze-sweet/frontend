import axios, { AxiosResponse } from 'axios';

export interface API {
  authorization: ({ login, password }: any) => any;
  initJsonDatabase: ({ data }: any) => any;
  postSwaggerData: ({ data, index }: any) => any;
  deleteJsonDatabase: () => any;
}

export const JsonServerApi = axios.create({
  baseURL: 'http://localhost:3001', // TODO использовать переменные
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

const api: API = {
  authorization: async ({ login, password }) => {
    // TODO Здесь будет жить запрос axios
    async function timeout() {
      return new Promise(resolve => setTimeout(resolve, 2000));
    }
    await timeout();
    if (login === '1' && password === '1') {
      return true;
    } else {
      throw new Error('Неверный логин/пароль!');
    }
  },

  initJsonDatabase: ({ data }) => {
    JsonServerApi.post('/api-doc', data);
  },

  deleteJsonDatabase: () => JsonServerApi.delete(`/api-doc/1`),

  postSwaggerData: ({ data }) =>
    JsonServerApi.put(`/api-doc`, {
      ...data,
    }),
};

export default api;
