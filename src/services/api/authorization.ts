import axios from 'axios';

export interface API {
  postToken: ({ username, password }: any) => any;
}

export const authorizationApi = axios.create({
  baseURL: 'https://docs.sima.team',
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

const api: API = {
  postToken: ({ username, password }) =>
    authorizationApi.post('/api/token', {
      username,
      password,
    }),
};

export default api;
