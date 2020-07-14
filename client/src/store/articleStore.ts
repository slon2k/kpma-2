import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { IArticle } from "../models";
import { api } from "../services";

export default class ArticleStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable articles: IArticle[] = [];
  @observable loadingArticles = false;

  @action loadArticles = async () => {
    this.loadingArticles = true;
    try {
      const items = await api.Articles.getList();
      runInAction(() => {
        this.articles = items;
        this.loadingArticles = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingArticles = false));
      console.error(error);
    }
  };
}
