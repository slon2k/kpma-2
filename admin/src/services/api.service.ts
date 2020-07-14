import axios, { AxiosResponse } from "axios";
import {
  ICategory,
  IArticle,
  IImage,
  IUser,
  IUserCredentials,
  IUserRegister,
} from "../models";

axios.defaults.baseURL = "https://localhost:44365/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (delay: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), delay)
  );

const request = {
  get: (url: string) => axios.get(url).then(sleep(750)).then(responseBody),
  getWithParams: (url: string, params: URLSearchParams) =>
    axios.get(url, { params }).then(sleep(750)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(750)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(750)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(750)).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(sleep(750))
      .then(responseBody);
  },
};

export const Images = {
  getList: (articleId: number): Promise<IImage[]> =>
    request.get(`/articles/${articleId}/images`),
  getDetails: (articleId: number, imageId: number): Promise<IImage> =>
    request.get(`/articles/${articleId}/images/${imageId}`),
  create: (articleId: number, image: IImage): Promise<IImage> =>
    request.post(`/articles/${articleId}/images`, image),
  update: (articleId: number, image: IImage): Promise<void> =>
    request.put(`/articles/${articleId}/images/${image.id}`, image),
  delete: (articleId: number, imageId: number): Promise<IImage> =>
    request.delete(`/articles/${articleId}/images/${imageId}`),
};

export const Categories = {
  getList: (): Promise<ICategory[]> => request.get("/categories"),
  getDetails: (categoryId: number): Promise<ICategory> =>
    request.get(`/categories/${categoryId}`),
  create: (category: ICategory): Promise<ICategory> =>
    request.post("/categories/", category),
  update: (category: ICategory): Promise<void> =>
    request.put(`/categories/${category.id}`, category),
  delete: (categoryId: number): Promise<ICategory> =>
    request.delete(`/categories/${categoryId}`),
};

export const Articles = {
  getList: (): Promise<IArticle[]> => request.get("/articles"),
  getDetails: (articleId: number): Promise<IArticle> =>
    request.get(`/articles/${articleId}`),
  create: (article: IArticle): Promise<IArticle> =>
    request.post("/articles/", article),
  update: (article: IArticle): Promise<void> =>
    request.put(`/articles/${article.id}`, article),
  delete: (articleId: number): Promise<IArticle> =>
    request.delete(`/articles/${articleId}`),
};

export const User = {
  login: (credentials: IUserCredentials): Promise<IUser> =>
    request.post("auth/login", credentials),
  register: (form: IUserRegister): Promise<IUser> =>
    request.post("auth/register", form),
  current: (): Promise<IUser> => request.get("auth/user"),
};
