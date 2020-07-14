import axios, { AxiosResponse } from "axios";
import { IMenuItem, ICategory, IArticle } from "../models";

axios.defaults.baseURL = "https://localhost:44365/api";

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (delay: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), delay)
  );

const request = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(750))
      .then(responseBody),
  getWithParams: (url: string, params: URLSearchParams) =>
    axios
      .get(url, { params })
      .then(sleep(750))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(750))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(750))
      .then(responseBody),
  delete: (url: string) =>
    axios
      .delete(url)
      .then(sleep(750))
      .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" }
      })
      .then(sleep(750))
      .then(responseBody);
  }
};

export const Menu = {
  get: (): Promise<IMenuItem[]> => request.get("/menu")
};

export const Categories = {
  get: (): Promise<ICategory[]> => request.get("/categories")
};

export const Articles = {
  getList: (): Promise<IArticle[]> =>
    request.get("/articles"),
  getArticle: (slug: string): Promise<IArticle> => request.get(`/articles/${slug}`)
};
