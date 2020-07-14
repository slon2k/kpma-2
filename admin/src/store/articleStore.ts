import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IArticle } from "../models";
import { api } from "../services";

export default class ArticleStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable articlesInventory = new Map<number, IArticle>();
  @observable article: IArticle | null = null;

  @observable loadingArticles = false;
  @observable loadingArticle = false;
  @observable updatingArticle = false;
  @observable deletingArticle = false;
  @observable articlesLoaded = false;

  @computed get articles() {
    return Array.from(this.articlesInventory.values());
  }

  @action loadArticles = async () => {
    this.loadingArticles = true;
    try {
      const items = await api.Articles.getList();
      runInAction(() => {
        items.forEach((item) => {
          this.articlesInventory.set(item.id, item);
        });
        this.loadingArticles = false;
        this.articlesLoaded = true;
      });
    } catch (error) {
      runInAction(() => (this.loadingArticles = false));
      console.error(error);
    }
  };

  @action loadArticle = async (articleId: number) => {
    this.loadingArticle = true;
    try {
      const item = await api.Articles.getDetails(articleId);
      runInAction(() => {
        this.articlesInventory.set(item.id, item);
        this.article = item;
        this.loadingArticle = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingArticle = false));
      console.error(error);
    }
  };

  @action createArticle = async (article: IArticle) => {
    this.updatingArticle = true;
    try {
      const newArticle = await api.Articles.create(article);
      runInAction(() => {
        this.article = newArticle;
        this.articlesInventory.set(newArticle.id, newArticle);
        this.updatingArticle = false;
      });
    } catch (error) {
      runInAction(() => (this.updatingArticle = false));
      console.error(error);
    }
  };

  @action deleteArticle = async (id: number) => {
    this.deletingArticle = true;
    try {
      await api.Articles.delete(id);
      runInAction(() => {
        this.article = null;
        this.articlesInventory.delete(id);
        this.deletingArticle = false;
      });
    } catch (error) {
      runInAction(() => (this.deletingArticle = false));
      console.error(error);
    }
  };

  @action updateArticle = async (article: IArticle) => {
    this.updatingArticle = true;
    try {
      await api.Articles.update(article);
      runInAction(() => {
        this.article = article;
        this.articlesInventory.set(article.id, article);
        this.updatingArticle = false;
      });
    } catch (error) {
      runInAction(() => (this.updatingArticle = false));
      console.error(error);
    }
  };

  @action setArticle = (id: number) =>
    (this.article = this.articlesInventory.get(id) || null);

  @action clearArticle = () => (this.article = null);
}
