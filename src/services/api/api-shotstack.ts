import axios, { AxiosResponse } from 'axios';

//Очень плохо, токены так не хранят
const xApiKey = 'sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3';

export interface API {
  render: (data: any) => any;
  getVideoStatus: (id: any) => any;
}

const sum = (array: any, maxIndex: any) => {
  let sum = 0;
  if (maxIndex === 0) return 0;
  for (let index = 0; index < maxIndex; index++) {
    sum += array[index];
  }
  return sum;
};

const sum2 = (array: any, maxIndex: any) => {
  let sum = 0;
  if (maxIndex === 0) return array[0];
  for (let index = 0; index < maxIndex + 1; index++) {
    sum += array[index];
  }
  return sum;
};

const api: API = {
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

export const uploadOnShotStack = async (requestData:  any) => {
  const {
    data: { response: {id} },
  } = await api.render(requestData);

  setTimeout(async () => {
     await api.getVideoStatus(id);
  }, 30000);
  


}