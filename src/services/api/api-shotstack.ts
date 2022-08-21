import axios, { AxiosResponse } from 'axios';

//Очень плохо, токены так не хранят
const xApiKey = 'sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3';

export interface API {
  probe: (url: string) => any;
  download: (url: any) => any;
  render: (data: any) => any;
  getVideoStatus: (id: any) => any;
}

const api: API = {
  probe: url => {
    return axios.get(`https://api.shotstack.io/stage/probe/${url}`, {
      timeout: 5000,
      headers: {
        'x-api-key': `sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  },
  download: url => {
    return axios.get(url, {
      timeout: 5000,
      headers: {
        'x-api-key': `sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  },
  render: data => {
    return axios.post(`https://api.shotstack.io/stage/render`, data, {
      timeout: 5000,
      headers: {
        'x-api-key': `sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  },
  getVideoStatus: (id: string) =>
    axios.get(`https://api.shotstack.io/stage/render/${id}`, {
      headers: {
        'x-api-key': `sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }),
};

export default api;

export const uploadOnShotStack = async (requestData: any) => {
  const {
    data: {
      response: { id },
    },
  } = await api.render(requestData);

  return setTimeout(async () => {
    const {
      data: {
        response: { url },
      },
    } = await api.getVideoStatus(id);
    return url;
  }, 30000);
};
