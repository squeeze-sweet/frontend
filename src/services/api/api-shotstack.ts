import axios, { AxiosResponse } from 'axios';

//Очень плохо, токены так не хранят
const xApiKey = 'sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3';

export interface API {
  render: (hrefs: any, durations: any) => any;
  getVideoStatus: (id: any) => any;
}

const api: API = {
  render: (hrefs: any, durations: any) =>
    axios.post(
      `https://api.shotstack.io/stage/render`,
      {
        timeline: {
          tracks: [
            {
              clips: [
                {
                  asset: {
                    type: 'video',
                    src: hrefs[0],
                  },
                  start: 0,
                  length: durations[0],
                },
              ],
            },
            {
              clips: [
                {
                  asset: {
                    type: 'video',
                    src: hrefs[1],
                  },
                  start: durations[0],
                  length: durations[0] + durations[1],
                },
              ],
            },
          ],
        },
        output: {
          format: 'mp4',
          resolution: 'sd',
        },
      },
      {
        timeout: 5000,
        headers: {
          'x-api-key': `sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    ),
  getVideoStatus: (id: string) => {
    axios.get(`https://api.shotstack.io/stage/render/${id}`, {
      headers: {
        'x-api-key': `sOP6UCkvBw5VXAJrljLFz94Zndc1rQlz7faDa6I3`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  },
};

export default api;
