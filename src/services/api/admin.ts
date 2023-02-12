import axios from "axios";
export interface API {
  getQuestions: (email: string, password: string) => any;
  getAudios: (email: string, password: string) => Promise<any>;
  postFile: (file: any, email: string, password: string) => any;
  mergeVideos: (
    files: any,
    meta: any,
    chosenAudioId: string,
    email: string,
    password: string
  ) => any;
  deleteFile: (id: string, email: string, password: string) => any;
  getVideos: (email: string, password: string) => Promise<{ data: any }>;
  getWhiteList: (email: string, password: string) => any;
  addWhiteListUser: (newEail: string, email: string, password: string) => any;
  deleteWhiteListUser: (id: string, email: string, password: string) => any;
  addCategory: (
    name: string,
    nameFr: string,
    email: string,
    password: string
  ) => any;
  addQuestion: (
    categoryId: string,
    question: string,
    questionFr: string,
    email: string,
    password: string
  ) => any;
  deleteCategory: (id: string, email: string, password: string) => any;
  deleteQuestion: (id: string, email: string, password: string) => any;
}

function authenticateUser(user: string, password: string) {
  var token = user + ":" + password;
  var hash = btoa(token);
  return "Basic " + hash;
}

const client = axios.create({
  baseURL: "https://vm-9dc5608b.na4u.ru/info/api/v1",
  timeout: 10000,
  headers: {
    Authorization: `${authenticateUser("tester@test.ru", "test")}`,
  },
});

const api: API = {
  getQuestions: async (email, password) =>
    client.get("/categories", {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  getAudios: async (email, password) =>
    client.get("/files?content-type=audio", {
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  getWhiteList: async (email, password) =>
    client.get(`/admin/users`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  getVideos: async (email, password) =>
    client.get("/files?content-type=video", {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  postFile: (file, email, password) => {
    const formData = new FormData();
    formData.append("file", file);
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
      body: formData,
    };
    return fetch(
      "https://vm-9dc5608b.na4u.ru/info/api/v1/admin/files",
      requestOptions as any
    );
  },
  mergeVideos: async (files, meta, chosenAudioId, email, password) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    formData.append("meta", meta);

    formData.append("soundtrack_id", chosenAudioId);
    chosenAudioId;
    var requestOptions = {
      method: "POST",
      headers: { Authorization: `${authenticateUser(email, password)}` },
      body: formData,
    };
    return fetch(
      "https://vm-9dc5608b.na4u.ru/info/api/v1/merge-final-video",
      requestOptions as any
    );
  },
  deleteFile: async (id, email, password) =>
    client.delete(`/admin/files/${id}`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  addCategory: async (name, nameFr, email, password) =>
    client.post(
      `/admin/categories`,
      [
        {
          name: name,
          name_fr: nameFr,
        },
      ],
      {
        timeout: 10000,
        headers: {
          Authorization: `${authenticateUser(email, password)}`,
        },
      }
    ),
  addQuestion: async (categoryId, question, questionFr, email, password) =>
    client.post(
      `/admin/categories`,
      [
        {
          id: categoryId,
          questions: [
            {
              text: question,
              text_fr: questionFr,
            },
          ],
        },
      ],
      {
        timeout: 10000,
        headers: {
          Authorization: `${authenticateUser(email, password)}`,
        },
      }
    ),
  deleteCategory: async (id, email, password) =>
    client.delete(`/admin/categories/${id}`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  deleteQuestion: async (id, email, password) =>
    client.delete(`/admin/questions/${id}`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
  addWhiteListUser: async (newEmail, email, password) =>
    client.post(
      `/admin/white-list`,
      { email: newEmail },
      {
        timeout: 10000,
        headers: {
          Authorization: `${authenticateUser(email, password)}`,
        },
      }
    ),
  deleteWhiteListUser: async (id, email, password) =>
    client.delete(`/admin/white-list/${id}`, {
      timeout: 10000,
      headers: {
        Authorization: `${authenticateUser(email, password)}`,
      },
    }),
};

export default api;
