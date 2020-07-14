import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { IImage } from "../models";
import { api } from "../services";

export default class ImageStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable images: IImage[] = [];
  @observable image: IImage | null = null;

  @observable loadingImages = false;
  @observable loadingImage = false;
  @observable updatingImage = false;
  @observable deletingImage = false;

  @action setLoadingImage = (value: boolean) => (this.loadingImages = value);

  @action loadImages = async (articleId: number) => {
    this.loadingImages = true;
    try {
      const items = await api.Images.getList(articleId);
      runInAction(() => {
        this.images = items;
        this.loadingImages = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingImages = false));
      console.error(error);
    }
  };

  @action loadImage = async (articleId: number, imageId: number) => {
    this.loadingImage = true;
    try {
      const item = await api.Images.getDetails(articleId, imageId);
      runInAction(() => {
        this.image = item;
        this.loadingImage = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingImage = false));
      console.error(error);
    }
  };

  @action createImage = async (articleId: number, image: IImage) => {
    this.updatingImage = true;
    try {
      const newImage = await api.Images.create(articleId, image);
      runInAction(() => {
        this.image = newImage;
        this.updatingImage = false;
      });
      this.rootStore.articleStore.loadArticle(articleId);
    } catch (error) {
      runInAction(() => (this.updatingImage = false));
      console.error(error);
    }
  };

  @action deleteImage = async (articleId: number, imageId: number) => {
    this.deletingImage = true;
    try {
      await api.Images.delete(articleId, imageId);
      runInAction(() => {
        this.image = null;
        this.deletingImage = false;
      });
      this.rootStore.articleStore.loadArticle(articleId);
    } catch (error) {
      runInAction(() => (this.deletingImage = false));
      console.error(error);
    }
  };

  @action updateImage = async (articleId: number, image: IImage) => {
    this.updatingImage = true;
    try {
      await api.Images.update(articleId, image);
      runInAction(() => (this.updatingImage = false));
      this.rootStore.articleStore.loadArticle(articleId);
    } catch (error) {
      runInAction(() => (this.updatingImage = false));
      console.error(error);
    }
  };
}
